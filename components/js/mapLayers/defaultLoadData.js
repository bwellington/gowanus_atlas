import Tooltip from '../visualization-components/tooltip';

export const loadData = function loadData(drawLayer) {
  const {
    dataInfo,
    data,
    refreshMap,
  } = this.props();

  const { dataPath } = dataInfo;

  this._.tooltip = new Tooltip().selection(d3.select('body'));

  if (data === undefined) {
    d3.json(dataPath, (loadedData) => {
      this._.data = loadedData;
      this.drawLayer();
      refreshMap();
    });
  } else {
    this.drawLayer();
    refreshMap();
  }
};

export const removeLayer = function removeLayer() {
  const { group, name } = this.props();
  group.selectAll(`.${name}-layer`).remove();
};

