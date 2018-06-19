import * as topojson from 'topojson-client';
import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import { loadData, removeLayer } from './defaultLoadData';


const parksLayer = new MapOverlayLayer()
  .addPropMethods(['dataInfo'])
  .draw(loadData)
  .remove(removeLayer);

parksLayer.drawLayer = function drawLayer() {
  const {
    data,
    group,
    name,
    tooltip,
  } = this.props();

  const parksGeojson = topojson
    .feature(data, data.objects.parks);

  group.selectAll(`.${name}-layer`)
    .data(parksGeojson.features)
    .enter()
    .append('path')
    .attr('class', `${name}-layer`)
    .on('mouseover', (d) => {
      const prop = d.properties;

      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['Park Type: ', prop.landuse],
          ['Park Name: ', prop.park_name],
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
    });
};

export default parksLayer;
