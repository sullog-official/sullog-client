import type { LayerProps } from 'react-map-gl';

export const clusterLayer: LayerProps = {
  id: 'clusters',
  type: 'symbol',
  source: 'records',
  filter: ['has', 'point_count'],
  layout: {
    'icon-image': 'pin',
    'icon-allow-overlap': true,
  },
  paint: {
    'icon-opacity': 1,
  },
};

export const clusterCountBackgroundLayer: LayerProps = {
  id: 'cluster-count-background',
  type: 'symbol',
  source: 'records',
  filter: ['has', 'point_count'],
  layout: {
    'icon-image': 'count',
    'icon-allow-overlap': true,
    'icon-offset': [12, -12],
  },
  paint: {
    'icon-opacity': 1,
  },
};

export const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'records',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
    'text-offset': [1, -1],
  },
  paint: {
    'text-color': '#ffffff',
    'icon-color': '#000',
  },
};

export const unclusteredPointLayer: LayerProps = {
  id: 'unclustered-point',
  type: 'symbol',
  source: 'records',
  filter: ['!', ['has', 'point_count']],
  layout: {
    'icon-image': 'pin',
    'icon-size': 1,
  },
  paint: {
    'icon-opacity': 1,
  },
};
