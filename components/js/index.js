import MapOverlay from './visualization-components/mapOverlay/mapOverlay';
import State from './visualization-components/state';
import Map from './map';
import Menu from './menu';
import TextOverlay from './textOverlay';
import Title from './title';
import containers from './containers';
import interviews from './interviews';
import { mapDatasetList, Dataset } from './datasetList';
import slrLayer from './mapLayers/slr';
import cleanupLayer from './mapLayers/cleanup';
import watershedLayer from './mapLayers/watershed';
import galleriesLayer from './mapLayers/galleries';
import landUseLayer from './mapLayers/landuse';
import zoningLayer from './mapLayers/zoning';
import constants from './constants';

require('../styles/leaflet.css');
require('../styles/index.scss');

const { mapContainer, outerContainer } = containers;
const { svgBounds, mapBounds } = constants;
const defaultView = { type: 'default' };

const state = new State({
  view: defaultView,
  selectedLayers: [],
  size: containers.getMapSize(),
});


const addDataInfoToLayer = ({ layer, dataName }) => {
  const dataInfo = Dataset.getDatasetByName(mapDatasetList, dataName);

  layer
    .name(dataInfo.name)
    .dataPath(dataInfo.dataPath);
};


addDataInfoToLayer({ layer: watershedLayer, dataName: 'watershed' });
addDataInfoToLayer({ layer: slrLayer, dataName: 'slr' });
addDataInfoToLayer({ layer: cleanupLayer, dataName: 'cleanup' });
addDataInfoToLayer({ layer: galleriesLayer, dataName: 'galleries' });
addDataInfoToLayer({ layer: landUseLayer, dataName: 'landuse' });
addDataInfoToLayer({ layer: zoningLayer, dataName: 'zoning' });


const map = Map({
  bounds: mapBounds,
  container: mapContainer,
});

const mapOverlay = new MapOverlay()
  .coordinateBounds(svgBounds)
  .addVectorLayer(watershedLayer)
  .addVectorLayer(slrLayer)
  .addVectorLayer(cleanupLayer)
  .addVectorLayer(galleriesLayer)
  .addVectorLayer(landUseLayer)
  .addVectorLayer(zoningLayer)
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
  .init();


const textOverlay = new TextOverlay()
  .selection(outerContainer)
  .view(state.view())
  .draw();

const testTitle = new Title();

testTitle.title.xxx = 50;
testTitle._.ok = 4;
new Title()
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

