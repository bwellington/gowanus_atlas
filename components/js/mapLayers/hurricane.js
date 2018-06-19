import * as topojson from 'topojson-client';
import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import { loadData, removeLayer } from './defaultLoadData';

const hurricaneLayer = new MapOverlayLayer()
  .addPropMethods(['dataInfo'])
  .draw(loadData)
  .remove(removeLayer);

hurricaneLayer.drawLayer = function drawLayer() {
  const {
    data,
    group,
    name,
    tooltip,
  } = this.props();

  const dataGeojson = topojson
    .feature(data, data.objects.hurricanezones);

  const zoneExtent = d3.extent(
      dataGeojson.features.filter(d => d.properties.hurricane !== 'X'),
      d => parseInt(d.properties.hurricane, 10));

  const zoneFillScale = d3.scaleLinear()
    .domain(zoneExtent)
    .range([d3.color('#cc8500'), d3.color('#ffdb99')]);

  const fillOpacity = 0.5;
  const highlightOpacity = 1;
  const animationSpeed = 500;
  const highlightSpeed = 150;
  const strokeWidth = 1;
  const highlightStrokeWidth = 2.5;

  group.selectAll(`.${name}-layer`)
    .data(dataGeojson.features
      .filter(d => d.properties.hurricane !== 'X'))
    .enter()
    .append('path')
    .sort((a, b) =>
      parseInt(a.properties.hurricane, 10) - parseInt(b.properties.hurricane, 10))
    .attrs({
      class: `${name}-layer`,
      fill: d => zoneFillScale(parseInt(d.properties.hurricane, 10)),
      stroke: 'white',
      cursor: 'pointer',
      'fill-opacity': fillOpacity,
      'stroke-width': strokeWidth,
      opacity: 0,
    })
    .on('mouseover', function mouseover(d) {
      d3.select(this)
        .transition()
        .duration(highlightSpeed)
        .attrs({
          'fill-opacity': highlightOpacity,
          'stroke-width': highlightStrokeWidth,
        });
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['Evacuation Zone: ', d.properties.hurricane],
        ])
        .draw();
    })
    .on('mousemove', () => {
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .update();
    })
    .on('mouseout', function mouseout() {
      d3.select(this)
        .transition()
        .duration(highlightSpeed)
        .attrs({
          'fill-opacity': fillOpacity,
          'stroke-width': strokeWidth,
        });
      tooltip.remove();
    })
    .transition()
    .duration(animationSpeed)
    .ease(d3.easeQuadInOut)
      .delay((d, i) => i * animationSpeed)
      .attrs({
        opacity: 1,
      });
};

export default hurricaneLayer;
