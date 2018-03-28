import Props from './visualization-components/privateProps';
import LandUseLayer from './mapLayers/landuse';

const privateProps = new WeakMap();

// const privateMethods = {};

const publicMethods = {
  init() {
    const props = privateProps.get(this);
    const { leafletMap } = props;

    props.layers = {
      landuse: new LandUseLayer()
        .leafletMap(leafletMap)
        .init(),
    };
    return this;
  },
  updateLayers() {
    const props = privateProps.get(this);
    const {
      layers,
      selectedLayers,
    } = props;

    Object.keys(layers)
    .forEach((layerName) => {
      if (selectedLayers.includes(layerName)) {
        layers[layerName].draw();
      } else {
        layers[layerName].remove();
      }
    });
  },
};

const publicProps = new Props({
  target: privateProps,
  fields: [
    'leafletMap',
    'selectedLayers',
  ],
});

class LeafletLayers {
  constructor() {
    privateProps.set(this, {
      selectedLayers: [],
    });
  }
}

Object.assign(LeafletLayers.prototype, publicMethods, publicProps);

export default LeafletLayers;
