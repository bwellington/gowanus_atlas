import * as topojson from 'topojson-client';
import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import Tooltip from '../visualization-components/tooltip';


const cleanData = (rawData) => {
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
};

const zoningLayer = new MapOverlayLayer()
  .type('Polygon')
  .render('Vector')
  .addPropMethods(['dataInfo', 'leafletMap'])
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

zoningLayer.drawLayer = function drawLayer() {
  const { data, name, group, refreshMap, tooltip } = this.props();

  group.selectAll(`.${name}-layer`)
    .data(data)
    .enter()
    .append('path')
    .attrs({
      class: `${name}-layer`,
      fill: d => d.properties.color,
    })
    .style('opacity', 0)
    .on('mouseover', (d) => {
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['Zoning: ', d.properties.ZoneDist1],
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
    .on('click', d => console.log(d))
    .transition()
    .duration(50)
    .delay((d, i) => i * 1)
    .style('opacity', 0.8);

  refreshMap();
};

zoningLayer.remove = function removeLayer() {
  const { group, name } = this.props();
  group.selectAll(`.${name}-layer`).remove();
};

export default zoningLayer;

