import * as topojson from 'topojson-client';
import Props from '../visualization-components/privateProps';
import getPlutoBase from './plutoBase';

const privateProps = new WeakMap();

const formatNum = d3.format(',d');

const publicProps = new Props({
  target: privateProps,
  fields: [
    'data',
    'dataPath',
    'leafletMap',
    'render',
  ],
});

const privateMethods = {
  cleanData(rawData) {
    const data = topojson.feature(rawData, rawData.objects.BKMapPluto);
    const dataExtent = d3.extent(data.features.filter(d => d.properties.AssessTot !== 0),
      d => d.properties.AssessTot);

    const scale = d3.scalePow().exponent(0.25).domain(dataExtent).range([0, 1]);
    const cleanFeatures = data
    .features
    .map((d) => {
      const cleanFeature = Object.assign({}, d);
      if (d.properties.AssessTot !== 0) {
        cleanFeature.properties.color =
        d3.interpolateYlOrRd(scale(d.properties.AssessTot));
      } else {
        cleanFeature.properties.color = 'grey';
      }
      return cleanFeature;
    });
    return cleanFeatures;
  },
  getTooltipText(feature) {
    return [
      ['Assessed Value: ', `$${formatNum(feature.properties.AssessTot)}`],
    ];
  },
};

const publicMethods = {};

class AssessedValueLayer {
  constructor() {
    privateProps.set(this, {
      name: 'assessedValue',
      status: false,
      tooltipOffset: { x: 10, y: 10 },
    });
  }
}

const {
  publicBaseMethods,
  privateBaseMethods,
} = getPlutoBase({ privateProps, privateMethods });

Object.assign(AssessedValueLayer.prototype,
  publicProps,
  publicMethods,
  publicBaseMethods,
);

Object.assign(
  privateMethods,
  privateBaseMethods,
);

export default AssessedValueLayer;
