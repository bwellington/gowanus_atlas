import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';

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


const cleanData = (rawData) => {
  console.log('raw lu', rawData);
  const cleanFeatures = rawData.features
  .filter(d => d.properties.LandUse !== null)
  .map((d) => {
    const cleanFeature = Object.assign({}, d);
    // d.properties.LandUse
    console.log(d.properties.LandUse);
    cleanFeature.properties.color = landUseCodes[d.properties.LandUse].color;
    cleanFeature.properties.landUseText = landUseCodes[d.properties.LandUse].text;
    return cleanFeature;
  });
  return cleanFeatures;
};

const landUseLayer = new MapOverlayLayer()
  .type('Polygon')
  .render('Vector')
  .addPropMethods(['dataPath'])
  .draw(function loadData() {
    const { dataPath, data } = this.props();
    if (data === undefined) {
      d3.json(dataPath, (loadedData) => {
        this._.data = cleanData(loadedData);
        this.drawLayer();
      });
    } else {
      this.drawLayer();
    }
  });

landUseLayer.drawLayer = function drawLayer() {
  const { data, name, group, refreshMap } = this.props();
  group.selectAll(`.${name}-layer`)
    .data(data)
    .enter()
    .append('path')
    .attrs({
      class: `${name}-layer`,
      fill: d => d.properties.color,
    });

  refreshMap();
};

landUseLayer.remove = function removeLayer() {
  const { group, name } = this.props();
  group.selectAll(`.${name}-layer`).remove();
};

export default landUseLayer;

