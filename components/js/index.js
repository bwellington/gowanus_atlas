import MapOverlay from './visualization-components/mapOverlay/mapOverlay';
import State from './visualization-components/state';
import Map from './map';
import Menu from './menu';
import TextOverlay from './textOverlay';
import Title from './title';
import containers from './containers';
import interviews from './interviews';
import { mapDatasetList } from './datasetList';
import slrLayer from './mapLayers/slr';
import cleanupLayer from './mapLayers/cleanup';
import watershedLayer from './mapLayers/watershed';
import galleriesLayer from './mapLayers/galleries';
import landUseLayer from './mapLayers/landuse';
import zoningLayer from './mapLayers/zoning';
import manufacturingLandUse from './mapLayers/manufacturingLandUse';
import plutoBounds from './mapLayers/plutoBounds';
import assessedValue from './mapLayers/assessedValue';
import constants from './constants';

require('../styles/leaflet.css');
require('../styles/index.scss');

[
  'png/tabs-01.png',
  'png/tabs-02.png',
  'png/tabs-03.png',
  'png/tabs-04.png',
].forEach((imgPath) => {
  const img = new Image();
  img.src = imgPath;
});

const { mapContainer, outerContainer } = containers;
const { svgBounds, mapBounds } = constants;

const state = new State({
  view: 'storiesList',
  tab: 'stories',
  dataLoaded: [],
  selectedLayers: ['assessedValue'],
  selectedInterview: undefined,
  size: containers.getMapSize(),
});


const addDataInfoToLayer = ({ layer, dataName }) => {
  const dataInfo = mapDatasetList.find(d => d.name === dataName);

  layer
    .name(dataInfo.name)
    .dataInfo(dataInfo);
};

addDataInfoToLayer({ layer: assessedValue, dataName: 'assessedValue' });
addDataInfoToLayer({ layer: plutoBounds, dataName: 'plutoBounds' });
addDataInfoToLayer({ layer: manufacturingLandUse, dataName: 'manufacturingLandUse' });
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
  .addVectorLayer(assessedValue)
  .addVectorLayer(plutoBounds)
  .addVectorLayer(watershedLayer)
  .addVectorLayer(slrLayer)
  .addVectorLayer(cleanupLayer)
  .addVectorLayer(galleriesLayer)
  .addVectorLayer(landUseLayer)
  .addVectorLayer(manufacturingLandUse)
  .addVectorLayer(zoningLayer)
  .selectedLayers(state.selectedLayers())
  .addTo(map);


const menu = new Menu()
  .interviews(interviews)
  .selection(outerContainer)
  .view(state.view())
  .mapLayers(mapDatasetList)
  .selectedInterview(state.selectedInterview())
  .selectedLayers(state.selectedLayers())
  .onInterviewClick((interview) => {
    state.update({ selectedInterview: interview, view: 'interview' });
    // state.update({ view: { type: 'interview', interview } });
  })
  .onBackClick(() => {
    state.update({ view: 'storiesList' });
  })
  .onTabClick((tab) => {
    const currentView = state.view();
    if (tab === currentView) return;
    state.update({ view: tab });
  })
  .onLayerClick((d) => {
    const currentSelectedLayers = state.selectedLayers();
    let newLayers;
    if (currentSelectedLayers.includes(d)) {
      const index = currentSelectedLayers.indexOf(d);
      newLayers = [...currentSelectedLayers.slice(0, index),
        ...currentSelectedLayers.slice(index + 1)];
    } else {
      newLayers = [...currentSelectedLayers, d];
    }

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
    const { view, selectedInterview } = this.props();


    menu
      .selectedInterview(selectedInterview)
      .view(view)
      .update();

    textOverlay
      .view(view)
      .selectedInterview(selectedInterview)
      .update();

    if (view === 'interview') {
      state.update({ selectedLayers: selectedInterview.layers });
    }
  },
  selectedLayers: function updateSelectedLayers() {
    const { selectedLayers } = this.props();

    mapOverlay.updateSelectedLayers(selectedLayers);
    menu
      .selectedLayers(selectedLayers)
      .updateMenuLayers();
  },
});

