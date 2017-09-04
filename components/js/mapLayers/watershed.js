import * as topojson from 'topojson-client';
import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';


const watershedLayer = new MapOverlayLayer()
  .type('Polygon')
  .name('watershed')
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

watershedLayer.drawLayer = function drawLayer() {
  const { data, group, refreshMap, name } = this.props();
  const geoJSON = topojson.feature(data, data.objects.watershedsketch);
  group.selectAll('.map__watershed-layer')
    .data(geoJSON.features)
    .enter()
    .append('path')
    .attrs({
      class: `${name} map__watershed-layer`,
      fill: 'none',
      stroke: 'orange',
      'stroke-width': 1.5,
      'stroke-dasharray': '10,5',
      opacity: 0,
    })
    .transition()
    .duration(500)
    .attrs({
      opacity: 0.8,
    });
  refreshMap();
};

watershedLayer.remove = function removeLayer() {
  const { group, name } = this.props();

  group.selectAll(`.${name}`).remove();
};

export default watershedLayer;
