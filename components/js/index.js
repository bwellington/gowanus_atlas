import MapOverlay from './visualization-components/mapOverlay/mapOverlay';
import State from './visualization-components/state';
import Map from './map';
import Menu from './menu';
import containers from './containers';
import interviews from './interviews';
import slrLayer from './mapLayers/slr';
import cleanupLayer from './mapLayers/cleanup';
import watershedLayer from './mapLayers/watershed';

require('../styles/leaflet.css');
require('../styles/index.scss');

const { mapContainer, outerContainer } = containers;

const state = new State({
  view: 'default',
  interview: '',
  size: containers.getMapSize(),
});

watershedLayer.dataPath('data/watershedsketch.json');

slrLayer.dataPaths([
  'data/75in_clip_simplified.topojson',
  'data/58in_clip_simplified.topojson',
  'data/30in_clip_simplified.topojson',
  'data/10in_clip_simplified.topojson',
]);

cleanupLayer.dataPath('data/cleanup.geojson');


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
  .addVectorLayer(slrLayer)
  .addVectorLayer(cleanupLayer)
  .selectedLayers(['watershed', 'slr', 'cleanup'])
  .addTo(map);

new Menu()
  .interviews(interviews)
  .selection(outerContainer)
  .draw();

const draw = () => {

};

draw();

