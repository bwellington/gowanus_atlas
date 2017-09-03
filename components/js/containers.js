const outerContainer = d3.select('#map-outer-container');
const mapContainer = d3.select('#map');

const containers = {
  outerContainer,
  mapContainer,
  getMapSize() {
    return { width: window.innerWidth, height: window.innerHeight };
  },
};

export default containers;
