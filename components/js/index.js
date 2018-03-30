import MapOverlay from './visualization-components/mapOverlay/mapOverlay';
import State from './visualization-components/state';
import LeafletMap from './map';
import Menu from './menu';
import TextOverlay from './textOverlay';
import Title from './title';
import TopMenu from './topMenu';
import containers from './containers';
import interviews from './interviews';
import { mapDatasetList } from './datasetList';
import slrLayer from './mapLayers/slr';
import cleanupLayer from './mapLayers/cleanup';
import watershedLayer from './mapLayers/watershed';
import galleriesLayer from './mapLayers/galleries';


import plutoBounds from './mapLayers/plutoBounds';
import csoLayer from './mapLayers/cso';

import constants from './constants';

import LeafletLayers from './leafletLayers';

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
  selectedLayers: [],
  selectedInterview: undefined,
  size: containers.getMapSize(),
});

const leafletMap = LeafletMap({
  bounds: mapBounds,
  container: mapContainer,
});

const leafletLayers = new LeafletLayers()
  .leafletMap(leafletMap)
  .init();

const addDataInfoToLayer = ({ layer, dataName }) => {
  const dataInfo = mapDatasetList.find(d => d.name === dataName);

  layer
    .name(dataInfo.name)
    .dataInfo(dataInfo);
};

addDataInfoToLayer({ layer: csoLayer, dataName: 'cso' });

// addDataInfoToLayer({ layer: assessedValue, dataName: 'assessedValue' });
addDataInfoToLayer({ layer: plutoBounds, dataName: 'plutoBounds' });
// addDataInfoToLayer({ layer: manufacturingLandUse, dataName: 'manufacturingLandUse' });
addDataInfoToLayer({ layer: watershedLayer, dataName: 'watershed' });
addDataInfoToLayer({ layer: slrLayer, dataName: 'slr' });
addDataInfoToLayer({ layer: cleanupLayer, dataName: 'cleanup' });
addDataInfoToLayer({ layer: galleriesLayer, dataName: 'galleries' });
// addDataInfoToLayer({ layer: landUseLayer, dataName: 'landuse' });
// addDataInfoToLayer({ layer: zoningLayer, dataName: 'zoning' });


const mapOverlay = new MapOverlay()
  .coordinateBounds(svgBounds)
  .addVectorLayer(csoLayer)
  // .addVectorLayer(assessedValue)
  .addVectorLayer(plutoBounds)
  .addVectorLayer(watershedLayer)
  .addVectorLayer(slrLayer)
  .addVectorLayer(cleanupLayer)
  .addVectorLayer(galleriesLayer)
  // .addVectorLayer(landUseLayer)
  // .addVectorLayer(manufacturingLandUse)
  // .addVectorLayer(zoningLayer)
  .selectedLayers(state.selectedLayers())
  .addTo(leafletMap);


const menu = new Menu()
  .interviews(interviews)
  .selection(outerContainer)
  .view(state.view())
  .mapLayers(mapDatasetList)
  .selectedInterview(state.selectedInterview())
  .selectedLayers(state.selectedLayers())
  .onInterviewClick((interview) => {
    state.update({ selectedInterview: interview, view: 'interview' });
  })
  .onBackClick(() => {
    state.update({ view: 'storiesList' });
  })
  .onTabClick((tab) => {
    const currentView = state.view();
    console.log(tab);
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
      const excludeLayers = mapDatasetList.find(dd => dd.name === d).exclude;
      if (excludeLayers.length > 0) {
        newLayers = currentSelectedLayers.filter(dd => !excludeLayers.includes(dd))
          .concat(d);
      } else {
        newLayers = [...currentSelectedLayers, d];
      }
    }
    state.update({ selectedLayers: newLayers });
  })
  .init();

const topMenu = new TopMenu()
  .container(d3.select('.top-menu'))
  .interviews(interviews)
  .mapLayers(mapDatasetList)
  .onLayerClick((d) => {
    const currentSelectedLayers = state.selectedLayers();

    let newLayers;
    if (currentSelectedLayers.includes(d)) {
      const index = currentSelectedLayers.indexOf(d);
      newLayers = [...currentSelectedLayers.slice(0, index),
        ...currentSelectedLayers.slice(index + 1)];
    } else {
      const excludeLayers = mapDatasetList.find(dd => dd.name === d).exclude;
      if (excludeLayers.length > 0) {
        newLayers = currentSelectedLayers.filter(dd => !excludeLayers.includes(dd))
          .concat(d);
      } else {
        newLayers = [...currentSelectedLayers, d];
      }
    }
    state.update({ selectedLayers: newLayers });
  })
  .onInterviewClick((interview) => {
    state.update({ selectedInterview: interview, view: 'interview' });
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
  .subtitle('Mapping the contexts and potential futures of the Gowanus Canal')
  .draw();


state.registerCallback({
  view: function updateView() {
    const { view } = this.props();

    if (view === 'storiesList') {
      state.update({ selectedInterview: undefined });
    }

    const { selectedInterview } = this.props();

    console.log('view', view);
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
    } else if (view === 'storiesList') {
      state.update({ selectedLayers: [] });
    }
  },
  selectedInterview() {
    const { selectedInterview } = this.props();

    topMenu
      .selectedInterview(selectedInterview)
      .updateInterview();
  },
  selectedLayers: function updateSelectedLayers() {
    const { selectedLayers } = this.props();

    const currentLeafletLayers = selectedLayers.filter(d => mapDatasetList.find(dd => dd.name === d).render === 'leaflet');
    const d3Layers = selectedLayers.filter(d => mapDatasetList.find(dd => dd.name === d).render === 'd3');

    leafletLayers
      .selectedLayers(currentLeafletLayers)
      .updateLayers();

    // currentLeafletLayers.forEach(layer => leafletLayers[layer].draw());


    mapOverlay
      .updateSelectedLayers(d3Layers);

    menu
      .selectedLayers(selectedLayers)
      .updateMenuLayers();
  },
});

