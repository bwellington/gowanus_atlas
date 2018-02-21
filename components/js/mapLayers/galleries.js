import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import Tooltip from '../visualization-components/tooltip';

const galleriesLayer = new MapOverlayLayer()
  .type('Point')
  .render('Vector')
  .addPropMethods(['dataPath'])
  .draw(function loadData() {
    const { dataPath, data } = this.props();
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

galleriesLayer.drawLayer = function drawLayer() {
  const {
    data,
    name,
    group,
    refreshMap,
    tooltip,
  } = this.props();

  const points = data.features.map((d) => {
    const point = Object.assign({}, d);
    point.lat = d.geometry.coordinates[1];
    point.lon = d.geometry.coordinates[0];
    return point;
  });


  group.selectAll(`.${name}-layer`)
    .data(points)
    .enter()
    .append('circle')
    .attrs({
      class: `${name}-layer`,
      cursor: 'pointer',
      // cx: d => map.latLngToLayerPoint(d).x,
      // cy: d => map.latLngToLayerPoint(d).y,
      r: 5,
    })
    .on('mouseover', (d) => {
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['Name: ', d.properties.name],
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

  refreshMap();
};

galleriesLayer.remove = function removeLayer() {
  const { group, name } = this.props();

  group.selectAll(`.${name}-layer`).remove();
};

export default galleriesLayer;
