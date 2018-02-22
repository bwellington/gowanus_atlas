import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';

const zoningLayer = new MapOverlayLayer()
  .type('Polygon')
  .render('Vector')
  .addPropMethods(['dataInfo'])
  .draw(function loadData() {
    const { dataInfo, data } = this.props();
    const { dataPath } = dataInfo;
    if (data === undefined) {
      d3.json(dataPath, (loadedData) => {
        this._.data = loadedData;
        this.drawLayer();
      });
    } else {
      this.drawLayer();
    }
  });

zoningLayer.drawLayer = function drawLayer() {
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

zoningLayer.remove = function removeLayer() {
  const { group, name } = this.props();
  group.selectAll(`.${name}-layer`).remove();
};

export default zoningLayer;

