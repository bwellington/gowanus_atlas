import MapOverlay from './visualization-components/mapOverlay/mapOverlay';
import State from './visualization-components/state';
import Map from './map';
import Menu from './menu';
import TextOverlay from './textOverlay';
import Title from './title';
import containers from './containers';
import interviews from './interviews';
import datasetList from './datasetList';
import slrLayer from './mapLayers/slr';
import cleanupLayer from './mapLayers/cleanup';
import watershedLayer from './mapLayers/watershed';

require('../styles/leaflet.css');
require('../styles/index.scss');

console.log(datasetList);

const { mapContainer, outerContainer } = containers;
const defaultView = { type: 'default' };

const state = new State({
  view: defaultView,
  selectedLayers: [],
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

const mapOverlay = new MapOverlay()
  .coordinateBounds(svgBounds)
  .addVectorLayer(watershedLayer)
  .addVectorLayer(slrLayer)
  .addVectorLayer(cleanupLayer)
  .selectedLayers([])
  .addTo(map);


const menu = new Menu()
  .interviews(interviews)
  .selection(outerContainer)
  .view(state.view())
  .onInterviewClick((interview) => {
    state.update({ view: { type: 'interview', interview } });
  })
  .onBackClick(() => {
    state.update({ view: defaultView });
  })
  .onLayerClick((newLayers) => {
    state.update({ selectedLayers: newLayers });
  })
  .draw();


const textOverlay = new TextOverlay()
  .selection(outerContainer)
  .view(state.view())
  .draw();

const testTitle = new Title();

testTitle.title.xxx = 50;
testTitle._.ok = 4;
const title = new Title()
  .selection(outerContainer)
  .title('The Gowanus Atlas')
  .subtitle('Mapping Brooklyn\'s Gowanus Canal')
  .draw();


state.registerCallback({
  view: function updateView() {
    const { view } = this.props();

    menu
      .view(view)
      .update();

    textOverlay
      .view(view)
      .update();

    if (view.type === 'interview') {
      state.update({ selectedLayers: view.interview.layers });
    }
    if (view.type === 'default') {
      state.update({ selectedLayers: [] });
    }
  },
  selectedLayers: function updateSelectedLayers() {
    const { selectedLayers } = this.props();
    mapOverlay.updateSelectedLayers(selectedLayers);
    menu.updateMenuLayers();
  },
});

