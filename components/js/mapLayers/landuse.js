import * as topojson from 'topojson-client';
import Props from '../visualization-components/privateProps';
import getPlutoBase from './plutoBase';

const privateProps = new WeakMap();

const landUseCodes = {
  '01': {
    text: 'One & Two Family Buildings',
    color: 'rgb(246,242,164)',
  },
  '02': {
    text: 'Multi-Family Walk-Up Buildings',
    color: 'rgb(255,224,148)',
  },
  '03': {
    text: 'Multi-Family Elevator Buildings',
    color: 'rgb(255,224,148)',
  },
  '04': {
    text: 'Mixed Residential and Commercial Buildings',
    color: 'rgb(244,190,136)',
  },
  '05': {
    text: 'Commercial and Office Buildings',
    color: 'rgb(234,144,158)',
  },
  '06': {
    text: 'Industrial and Manufacturing',
    color: 'rgb(200,100,220)',
  },
  '07': {
    text: 'Transportation and Utility',
    color: 'rgb(160,130,160)',
  },
  '08': {
    text: 'Public Facilities and Institutions',
    color: 'rgb(90,180,200)',
  },
  '09': {
    text: 'Open Space and Outdoor Recreation',
    color: 'rgb(180,220,150)',
  },
  10: {
    text: 'Parking Facilities',
    color: 'rgb(200,175,165)',
  },
  11: {
    text: 'Vacant Land',
    color: 'rgb(150,100,80)',
  },
};

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
    .filter(d => d.properties.LandUse !== null)
    .map((d) => {
      const cleanFeature = Object.assign({}, d);
      const code = landUseCodes[d.properties.LandUse];
      if (code === undefined) {
        cleanFeature.properties.color = 'grey';
        cleanFeature.properties.landUseText = 'Undefined';
      } else {
        cleanFeature.properties.color = code.color;
        cleanFeature.properties.landUseText = code.text;
      }

      return cleanFeature;
    });
    return cleanFeatures;
  },
  getTooltipText(feature) {
    return [
      ['Land Use: ', feature.properties.landUseText],
    ];
  },
};

const publicMethods = {};

class LandUseLayer {
  constructor() {
    privateProps.set(this, {
      name: 'landuse',
      status: false,
      tooltipOffset: { x: 10, y: 10 },
    });
  }
}

const {
  publicBaseMethods,
  privateBaseMethods,
} = getPlutoBase({ privateProps, privateMethods });

Object.assign(LandUseLayer.prototype,
  publicProps,
  publicMethods,
  publicBaseMethods,
);

Object.assign(
  privateMethods,
  privateBaseMethods,
);

export default LandUseLayer;
