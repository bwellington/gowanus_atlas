import * as topojson from 'topojson-client';
import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import { loadData, removeLayer } from './defaultLoadData';

const sandyLayer = new MapOverlayLayer()
  .addPropMethods(['dataInfo'])
  .draw(loadData)
  .remove(removeLayer);

sandyLayer.drawLayer = function drawLayer() {
  const {
    data,
    group,
    name,
    tooltip,
  } = this.props();
  console.log('sandy', data);
  group
    .selectAll(`.${name}-layer`)
    .data(topojson.feature(data, data.objects.sandyinundation).features)
    .enter()
    .append('path')
    .attrs({
      class: `${name}-layer`,
    })
    .on('mouseover', () => {
      d3.selectAll(`.${name}-layer`)
        .classed(`${name}-layer--selected`, true);
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['', 'Hurricane Sandy Inundation'],
        ])
        .draw();
    })
    .on('mousemove', () => {
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .update();
    })
    .on('mouseout', () => {
      d3.selectAll(`.${name}-layer`)
        .classed(`${name}-layer--selected`, false);
      tooltip.remove();
    });
};

export default sandyLayer;
