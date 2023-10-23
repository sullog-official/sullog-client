import classNames from 'classnames/bind';
import { useEffect, useMemo, useRef, useState } from 'react';
import ReactMapGL, {
  Layer,
  Source,
  useMap,
  type GeoJSONSource,
  type MapRef,
} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import type { Experience } from '@/shared/types/Experience';

import Slider from '../Slider';

import {
  clusterCountBackgroundLayer,
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from './layers';
import styles from './Map.module.scss';

const cx = classNames.bind(styles);

const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN?.replace(
  / /g,
  ''
);

type MapProps = {
  records: Experience[];
  selectedFilters: string[];
};

const MapImage = ({ id, src }: { id: string; src: string }) => {
  const { current: map } = useMap();

  if (map && !map.hasImage(id)) {
    map.loadImage(src, (error, image) => {
      if (error) throw error;
      if (!map.hasImage(id) && image) {
        map.addImage(id, image);
      }
    });
  }

  return null;
};

const Map = ({ records, selectedFilters }: MapProps) => {
  const mapRef = useRef<MapRef>(null);
  const [selectedItems, setSelectedItems] = useState<Experience[]>([]);
  const data = useMemo(
    () => ({
      type: 'FeatureCollection',
      features: records?.map((record: Experience) => ({
        type: 'Feature',
        properties: record,
        geometry: {
          type: 'Point',
          coordinates: [
            Number(record.productionLongitude),
            Number(record.productionLatitude),
          ],
        },
      })),
    }),
    [records]
  );
  const MAP_STYLE_URL = 'mapbox://styles/jinho1011/cl5faqrml00dv15qvknh8tres';

  useEffect(() => {
    setSelectedItems([]);
  }, [selectedFilters]);

  const onClick = (event: any) => {
    if (!mapRef.current) {
      return;
    }

    if (!event.features?.length) {
      setSelectedItems([]);
      return;
    }

    const feature = event.features[0];

    if (feature.layer.id === 'clusters') {
      const clusterId = feature.properties.cluster_id;

      const mapboxSource = mapRef.current.getSource('records') as GeoJSONSource;

      mapboxSource.getClusterChildren(clusterId, (err, features) => {
        setSelectedItems(
          features.map((feature) => feature.properties).flat() as Experience[]
        );
      });
    }

    if (feature.layer.id === 'unclustered-point') {
      setSelectedItems([feature.properties]);
    }
  };

  return (
    <div className={cx('map-container')}>
      <ReactMapGL
        initialViewState={{
          longitude: 126.977966,
          latitude: 37.516536,
          zoom: 7,
        }}
        mapStyle={MAP_STYLE_URL}
        mapboxAccessToken={mapboxAccessToken}
        // maxBounds={maxBounds as LngLatBoundsLike}
        interactiveLayerIds={[
          clusterLayer.id as string,
          unclusteredPointLayer.id as string,
        ]}
        onClick={onClick}
        ref={mapRef}
      >
        <MapImage id="pin" src="/pin.png" />
        <MapImage id="count" src="/pin-count.png" />
        <Source
          id="records"
          type="geojson"
          data={data as any}
          cluster
          clusterMaxZoom={10}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountBackgroundLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
        <Slider items={selectedItems} />
      </ReactMapGL>
    </div>
  );
};

export default Map;
