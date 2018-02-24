import * as topojson from 'topojson-client';
import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import Tooltip from '../visualization-components/tooltip';


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
  console.log(topojson.feature(rawData, rawData.objects.pluto));
  const cleanFeatures = topojson.feature(rawData, rawData.objects.pluto)
  .features
  .filter(d => d.properties.LandUse === '06')
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
};

const manufacturingLandUse = new MapOverlayLayer()
  .type('Polygon')
  .render('Vector')
  .addPropMethods(['dataInfo'])
  .draw(function loadData() {
    const { dataInfo, data } = this.props();
    const { dataPath } = dataInfo;
    this._.tooltip = new Tooltip().selection(d3.select('body'));
    if (data === undefined) {
      d3.json(dataPath, (loadedData) => {
        this._.data = cleanData(loadedData);
        this.drawLayer();
      });
    } else {
      this.drawLayer();
    }
  });

manufacturingLandUse.drawLayer = function drawLayer() {
  const { data, name, group, refreshMap, tooltip } = this.props();

  group.selectAll(`.${name}-layer`)
    .data(data)
    .enter()
    .append('path')
    .attrs({
      class: `${name}-layer`,
      fill: d => d.properties.color,
    })
    .on('mouseover', (d) => {
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['Land Use: ', d.properties.landUseText],
        ])
        .draw();
    })
    .on('mousemove', () => {
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .update();
    })
    .on('mouseout', () => {
      tooltip.remove();
    })
    .on('click', d => console.log(d));

  refreshMap();
};

manufacturingLandUse.remove = function removeLayer() {
  const { group, name } = this.props();
  group.selectAll(`.${name}-layer`).remove();
};

export default manufacturingLandUse;
