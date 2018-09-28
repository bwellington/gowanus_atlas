import MapOverlay from './visualization-components/mapOverlay/mapOverlay';
import State from './visualization-components/state';
import LeafletMap from './map';
import Sidebar from './sidebar';
import TextOverlay from './textOverlay';
// import Title from './title';
import TopMenu from './topMenu';
import containers from './containers';
import interviews from './interviews';
import { mapDatasetList } from './datasetList';
import slrLayer from './mapLayers/slr';
import cleanupLayer from './mapLayers/cleanup';
import watershedLayer from './mapLayers/watershed';
import galleriesLayer from './mapLayers/galleries';
import bikeLayer from './mapLayers/bike';
import busLayer from './mapLayers/bus';
import femaLayer from './mapLayers/fema';
import parksLayer from './mapLayers/parks';
import hurricaneLayer from './mapLayers/hurricane';
import sandyLayer from './mapLayers/sandy';
import historicWaterLayer from './mapLayers/hwater';
import subwayLayer from './mapLayers/subway';
import nychaLayer from './mapLayers/nycha';
import schoolLayer from './mapLayers/school';
import policeLayer from './mapLayers/police';


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

const { mapContainer } = containers;
const { svgBounds, mapBounds } = constants;

const state = new State({
  view: 'storiesList',
  tab: 'stories',
  dataLoaded: [],
  selectedLayers: ['watershed'],
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
addDataInfoToLayer({ layer: plutoBounds, dataName: 'plutoBounds' });
addDataInfoToLayer({ layer: watershedLayer, dataName: 'watershed' });
addDataInfoToLayer({ layer: slrLayer, dataName: 'slr' });
addDataInfoToLayer({ layer: cleanupLayer, dataName: 'cleanup' });
addDataInfoToLayer({ layer: galleriesLayer, dataName: 'galleries' });
addDataInfoToLayer({ layer: bikeLayer, dataName: 'bike' });
addDataInfoToLayer({ layer: subwayLayer, dataName: 'subway' });
addDataInfoToLayer({ layer: nychaLayer, dataName: 'nycha' });
addDataInfoToLayer({ layer: schoolLayer, dataName: 'school' });
addDataInfoToLayer({ layer: policeLayer, dataName: 'police' });
addDataInfoToLayer({ layer: busLayer, dataName: 'bus' });
addDataInfoToLayer({ layer: femaLayer, dataName: 'fema' });
addDataInfoToLayer({ layer: parksLayer, dataName: 'parks' });
addDataInfoToLayer({ layer: hurricaneLayer, dataName: 'hurricane' });
addDataInfoToLayer({ layer: sandyLayer, dataName: 'sandy' });
addDataInfoToLayer({ layer: historicWaterLayer, dataName: 'hwater' });

const mapOverlay = new MapOverlay()
  .coordinateBounds(svgBounds)
  .addVectorLayer(csoLayer)
  .addVectorLayer(plutoBounds)
  .addVectorLayer(watershedLayer)
  .addVectorLayer(slrLayer)
  .addVectorLayer(cleanupLayer)
  .addVectorLayer(galleriesLayer)
  .addVectorLayer(bikeLayer)
  .addVectorLayer(subwayLayer)
  .addVectorLayer(busLayer)
  .addVectorLayer(femaLayer)
  .addVectorLayer(parksLayer)
  .addVectorLayer(hurricaneLayer)
  .addVectorLayer(sandyLayer)
  .addVectorLayer(historicWaterLayer)
  .addVectorLayer(nychaLayer)
  .addVectorLayer(policeLayer)
  .addVectorLayer(schoolLayer)
  .selectedLayers(state.selectedLayers())
  .addTo(leafletMap);

const onLayerClick = (d) => {
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
};

const sidebar = new Sidebar()
  .container(d3.select('.sidebar'))
  .onLayerClick(onLayerClick)
  .onCloseClick(() => state.update({ selectedInterview: undefined }))
  .selectedLayers(state.selectedLayers())
  .mapLayers(mapDatasetList)
  .init();

const topMenu = new TopMenu()
  .container(d3.select('.top-menu'))
  .interviews(interviews)
  .mapLayers(mapDatasetList)
  .selectedLayers(state.selectedLayers())
  .onLayerClick(onLayerClick)
  .onClearClick(() => state.update({ selectedLayers: [] }))
  .onInterviewClick((interview) => {
    const currentInterview = state.selectedInterview();
    const currentName = currentInterview === undefined ? '' : currentInterview.name;

    if (interview.name === currentName) {
      state.update({ selectedInterview: undefined });
    } else {
      state.update({ selectedInterview: interview });
    }
  })
  .init();

const textOverlay = new TextOverlay()
  .init();


state.registerCallback({
  view: function updateView() {
    // const { view } = this.props();

    // if (view === 'storiesList') {
    //   state.update({ selectedInterview: undefined });
    // }

    // const { selectedInterview } = this.props();

    // textOverlay
    //   .view(view)
    //   .selectedInterview(selectedInterview)
    //   .update();

    // if (view === 'interview') {
    //   state.update({ selectedLayers: selectedInterview.layers });
    // } else if (view === 'storiesList') {
    //   state.update({ selectedLayers: [] });
    // }
  },
  selectedInterview() {
    const { selectedInterview } = this.props();

    topMenu
      .selectedInterview(selectedInterview)
      .updateInterview();

    sidebar
      .selectedInterview(selectedInterview)
      .updateInterview();

    textOverlay
      .selectedInterview(selectedInterview)
      .update();

    if (selectedInterview !== undefined) {
      state.update({ selectedLayers: selectedInterview.layers });
    }
  },
  selectedLayers: function updateSelectedLayers() {
    const { selectedLayers } = this.props();

    const currentLeafletLayers = selectedLayers.filter(d => mapDatasetList.find(dd => dd.name === d).render === 'leaflet');
    const d3Layers = selectedLayers.filter(d => mapDatasetList.find(dd => dd.name === d).render === 'd3');

    leafletLayers
      .selectedLayers(currentLeafletLayers)
      .updateLayers();

    mapOverlay
      .updateSelectedLayers(d3Layers);

    topMenu
      .selectedLayers(selectedLayers)
      .updateLayers();

    sidebar
      .selectedLayers(selectedLayers)
      .updateLayers();
  },
});

