import MapOverlay from './visualization-components/mapOverlay/mapOverlay';
import Map from './map';
import containers from './containers';

// import slrLayer from './mapLayers/slr';
import watershedLayer from './mapLayers/watershed';

require('../styles/leaflet.css');
require('../styles/index.scss');

const { mapContainer } = containers;

watershedLayer.dataPath('data/watershedsketch.json');


const mapBounds = [[40.68330841818999, -74.00514352808408],
 [40.66438090633452, -73.98112238190814]];

const svgBounds = [[40.720980, -74.049538],
[40.652425, -73.939110]];

const map = Map({
  bounds: mapBounds,
  container: mapContainer,
});

new MapOverlay()
  .coordinateBounds(svgBounds)
  .addVectorLayer(watershedLayer)
  .selectedLayers(['watershed'])
  .addTo(map);

const draw = () => {

};

draw();

