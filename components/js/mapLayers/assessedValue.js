import * as topojson from 'topojson-client';
import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import Tooltip from '../visualization-components/tooltip';

const formatNum = d3.format(',d');

const cleanData = (rawData) => {
  const data = topojson.feature(rawData, rawData.objects.pluto);
  const dataExtent = d3.extent(data.features.filter(d => d.properties.AssessTot !== 0),
    d => d.properties.AssessTot);

  const scale = d3.scaleSqrt().domain(dataExtent).range([0, 1]);
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
};

const assessedValueLayer = new MapOverlayLayer()
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

assessedValueLayer.drawLayer = function drawLayer() {
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
          ['Total Assessed Value: ', `$${formatNum(d.properties.AssessTot)}`],
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

assessedValueLayer.remove = function removeLayer() {
  const { group, name } = this.props();
  group.selectAll(`.${name}-layer`).remove();
};

export default assessedValueLayer;
