const outerContainer = d3.select('#map-outer-container');
const mapContainer = d3.select('#map');

const containers = {
  outerContainer,
  mapContainer,
  getMapSize() {
    const mapContainerClientRect = this.mapContainer.node().getBoundingClientRect();
    return { width: mapContainerClientRect.width, height: mapContainerClientRect.height };
  },
};

export default containers;
