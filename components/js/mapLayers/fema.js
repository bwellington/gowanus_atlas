import * as topojson from 'topojson-client';
import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import Tooltip from '../visualization-components/tooltip';

const drawLayer = function drawLayer() {
  const {
    data,
    group,
    name,
    tooltip,
  } = this.props();

  console.log('femaTopo', data);
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
      console.log(prop);
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

const femaLayer = new MapOverlayLayer()
  .addPropMethods(['dataInfo'])
  .draw(function loadData() {
    const {
      dataInfo,
      data,
      refreshMap,
    } = this.props();

    const { dataPath } = dataInfo;

    this._.tooltip = new Tooltip().selection(d3.select('body'));

    if (data === undefined) {
      d3.json(dataPath, (femaData) => {
        this._.data = femaData;
        drawLayer.call(this);
        refreshMap();
      });
    } else {
      drawLayer.call(this);
      refreshMap();
    }
  })
  .remove(function removeLayer() {
    const { group, name } = this.props();
    group.selectAll(`.${name}-layer`).remove();
  });

export default femaLayer;
