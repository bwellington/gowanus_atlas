import * as topojson from 'topojson-client';
import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import Tooltip from '../visualization-components/tooltip';

const plutoBoundsLayer = new MapOverlayLayer()
  .type('Polygon')

  .render('Vector')
  .addPropMethods(['dataInfo'])
  .draw(function loadData() {
    const { dataInfo, data } = this.props();
    const { dataPath } = dataInfo;
    this._.tooltip = new Tooltip().selection(d3.select('body'));
    if (data === undefined) {
      d3.json(dataPath, (loadedData) => {
        this._.data = loadedData;
        this.drawLayer();
      });
    } else {
      this.drawLayer();
    }
  });

plutoBoundsLayer.drawLayer = function drawLayer() {
  const { data, group, refreshMap, name, tooltip } = this.props();

  const geoJSON = topojson.feature(data, data.objects.plutobounds);

  group
    .append('path')
    .datum(geoJSON)
    .attrs({
      class: `${name}-layer`,
      opacity: 0,
    })
    .on('mouseover', () => {
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['', 'Study Area (Approximate Bounds of Rezoning)'],
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
    .transition()
    .duration(500)
    .attrs({
      opacity: 0.8,
    });
  refreshMap();
};

plutoBoundsLayer.remove = function removeLayer() {
  const { group, name } = this.props();

  group.selectAll(`.${name}-layer`).remove();
};

export default plutoBoundsLayer;
