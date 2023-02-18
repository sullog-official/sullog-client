import classNames from 'classnames/bind';
import { GeoJSONSource } from 'mapbox-gl';
import { useRef, useState, useEffect } from 'react';
import ReactMapGL, { Layer, MapRef, Source, useMap } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { Experience } from '@/shared/types/Experience';

import Slider from '../Slider';

import {
  clusterLayer,
  unclusteredPointLayer,
  clusterCountBackgroundLayer,
  clusterCountLayer,
} from './layers';
import styles from './Map.module.scss';

const cx = classNames.bind(styles);

const mapboxAccessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN?.replace(
  / /g,
  ''
);

type MapProps = {
  records: Experience[];
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

const Map = ({ records }: MapProps) => {
  const mapRef = useRef<MapRef>(null);
  const [selectedItems, setSelectedItems] = useState<Experience[]>([]);
  const [data, setData] = useState({
    type: 'FeatureCollection',
    features: records?.map((record: Experience) => ({
      type: 'Feature',
      properties: record,
      geometry: {
        type: 'Point',
        coordinates: [Number(record.lat), Number(record.lng)],
      },
    })),
  });

  useEffect(() => {
    setData({
      type: 'FeatureCollection',
      features: records?.map((record: Experience) => ({
        type: 'Feature',
        properties: record,
        geometry: {
          type: 'Point',
          coordinates: [Number(record.lat), Number(record.lng)],
        },
      })),
    });
  }, [records]);

  const onClick = (event: any) => {
    if (mapRef.current) {
      if (event.features && event.features.length > 0) {
        const feature = event.features[0];
        if (feature.layer.id === 'clusters' && feature.properties) {
          const clusterId = feature.properties.cluster_id;

          const mapboxSource = mapRef.current.getSource(
            'records'
          ) as GeoJSONSource;

          mapboxSource.getClusterChildren(clusterId, (err, features) => {
            setSelectedItems(
              features
                .map((feature) => feature.properties)
                .flat() as Experience[]
            );
            // show records in slider
          });
        }

        if (feature.layer.id === 'unclustered-point') {
          // navigate to specific record
        }
      } else {
        setSelectedItems([]);
      }
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
        mapStyle="mapbox://styles/jinho1011/cl5faqrml00dv15qvknh8tres"
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
