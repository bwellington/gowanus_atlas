import * as topojson from 'topojson-client';
import Props from '../visualization-components/privateProps';
import getPlutoBase from './plutoBase';

const privateProps = new WeakMap();

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
    const cleanFeatures = topojson.feature(rawData, rawData.objects.BKMapPluto)
    .features
    .map((d) => {
      const cleanFeature = Object.assign({}, d);
      const zoneLetter = d.properties.ZoneDist1.slice(0, 1);
      if (zoneLetter === 'M') {
        cleanFeature.properties.color = 'rgb(200,100,220)';
      } else if (zoneLetter === 'C') {
        cleanFeature.properties.color = 'rgb(234,144,158)';
      } else if (zoneLetter === 'R') {
        cleanFeature.properties.color = 'rgb(246,242,164)';
      } else {
        cleanFeature.properties.color = 'grey';
      }

      return cleanFeature;
    });
    return cleanFeatures;
  },
  getTooltipText(feature) {
    return [
      ['Zoning: ', feature.properties.ZoneDist1],
    ];
  },
};

const publicMethods = {};

class ZoningLayer {
  constructor() {
    privateProps.set(this, {
      name: 'manufacturingLandUse',
      status: false,
      tooltipOffset: { x: 10, y: 10 },
    });
  }
}

const {
  publicBaseMethods,
  privateBaseMethods,
} = getPlutoBase({ privateProps, privateMethods });

Object.assign(ZoningLayer.prototype,
  publicProps,
  publicMethods,
  publicBaseMethods,
);

Object.assign(
  privateMethods,
  privateBaseMethods,
);

export default ZoningLayer;
