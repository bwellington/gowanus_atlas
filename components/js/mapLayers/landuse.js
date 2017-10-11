import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';

const landUseLayer = new MapOverlayLayer()
  .type('Polygon')
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

landUseLayer.drawLayer = function drawLayer() {
  const { data, name, group, refreshMap } = this.props();
  group.selectAll(`.${name}-layer`)
    .data(data.features)
    .enter()
    .append('path')
    .attrs({
      class: `${name}-layer`,
      fill: 'white',
    });

  refreshMap();
};

landUseLayer.remove = function removeLayer() {
  const { group, name } = this.props();
  group.selectAll(`.${name}-layer`).remove();
};

export default landUseLayer;

