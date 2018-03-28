import Props from './visualization-components/privateProps';
import LandUseLayer from './mapLayers/landuse';
import AssessedValueLayer from './mapLayers/assessedValue';
// import zoningLayer from './mapLayers/zoning';
// import manufacturingLandUse from './mapLayers/manufacturingLandUse';

const privateProps = new WeakMap();

// const privateMethods = {};

const publicMethods = {
  init() {
    const props = privateProps.get(this);
    const { leafletMap } = props;

    props.layers = [
      {
        name: 'landuse',
        Layer: LandUseLayer,
      },
      {
        name: 'assessedValue',
        Layer: AssessedValueLayer,
      },
    ].reduce((accumulator, d) => {
      /* eslint-disable no-param-reassign */
      accumulator[d.name] = new d.Layer()
        .leafletMap(leafletMap)
        .init();
      return accumulator;
      /* eslint-enable no-param-reassign */
    }, {});

    return this;
  },
  updateLayers() {
    const props = privateProps.get(this);
    const {
      layers,
      selectedLayers,
    } = props;
    console.log(selectedLayers);

    Object.keys(layers)
    .forEach((layerName) => {
      if (selectedLayers.includes(layerName)) {
        console.log('draw', layerName);
        layers[layerName].draw();
      } else {
        console.log('remove', layerName);
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
