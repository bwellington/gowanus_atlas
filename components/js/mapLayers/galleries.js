import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';

const galleriesLayer = new MapOverlayLayer()
  .type('Point')
  .render('Vector')
  .addPropMethods(['dataPath'])
  .draw(function loadData() {
    const { dataPath, data } = this.props();
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
  const { data, name, group, refreshMap, map } = this.props();

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
      cx: d => map.latLngToLayerPoint(d).x,
      cy: d => map.latLngToLayerPoint(d).y,
      fill: 'red',
      r: 5,
    });

  refreshMap();
};

galleriesLayer.remove = function removeLayer() {
  const { group, name } = this.props();

  group.selectAll(`.${name}-layer`).remove();
};

export default galleriesLayer;
