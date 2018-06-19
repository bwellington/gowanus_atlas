import * as topojson from 'topojson-client';
import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import { loadData, removeLayer } from './defaultLoadData';


const femaLayer = new MapOverlayLayer()
  .addPropMethods(['dataInfo'])
  .draw(loadData)
  .remove(removeLayer);

femaLayer.drawLayer = function drawLayer() {
  const {
    data,
    group,
    name,
    tooltip,
  } = this.props();

  const femaGeojson = topojson
    .feature(data, data.objects.s_fld_haz_ar);

  group.selectAll(`.${name}-layer`)
    .data(femaGeojson
        .features
        .filter(d => d.properties.FLD_ZONE !== 'X'))
    .enter()
    .append('path')
    .attrs({
      class: `${name}-layer`,
    })
    .on('mouseover', (d) => {
      const prop = d.properties;
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['Flood Zone: ', prop.FLD_ZONE],
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

export default femaLayer;
