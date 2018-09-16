import Props from './visualization-components/privateProps';
import LandUseLayer from './mapLayers/landuse';
import AssessedValueLayer from './mapLayers/assessedValue';
import ZoningLayer from './mapLayers/zoning';
import ManufacturingLandUseLayer from './mapLayers/manufacturingLandUse';
import demographicsLayer from './mapLayers/demographics';
import youthLayer from './mapLayers/youth';
import seniorLayer from './mapLayers/senior';

const privateProps = new WeakMap();

// console.log(ManufacturingLandUseLayer);

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
      {
        name: 'manufacturingLandUse',
        Layer: ManufacturingLandUseLayer,
      },
      {
        name: 'zoning',
        Layer: ZoningLayer,
      },
      {
        name: 'demographics',
        Layer: demographicsLayer,
      },
      {
        name: 'youth',
        Layer: youthLayer,
      },
      {
        name: 'senior',
        Layer: seniorLayer,
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
