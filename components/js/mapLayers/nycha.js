import * as topojson from 'topojson-client';
import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import { loadData, removeLayer } from './defaultLoadData';

const nychaLayer = new MapOverlayLayer()
  .addPropMethods(['dataInfo'])
  .draw(loadData)
  .remove(removeLayer);

nychaLayer.drawLayer = function drawLayer() {
  const {
    data,
    group,
    name,
    tooltip,
  } = this.props();

  group
    .selectAll(`.${name}-layer`)
    .data(topojson.feature(data, data.objects.nycha).features)
    .enter()
    .append('path')
    .attrs({
      class: `${name}-layer`,
    })
    .on('mouseover click', (d) => {
      d3.selectAll(`.${name}-layer`)
        .classed(`${name}-layer--selected`, true);
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['Development Name: ', d.properties.developmen],
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

export default nychaLayer;
