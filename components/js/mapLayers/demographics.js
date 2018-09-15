import * as topojson from 'topojson-client';
import Props from '../visualization-components/privateProps';
import datasetList from '../datasetList';
import Tooltip from '../visualization-components/tooltip';

const privateProps = new WeakMap();
const privateMethods = {
  cleanData(rawData) {
    return topojson.feature(rawData, rawData.objects.demographics10).features;
  },
  draw() {
    const props = privateProps.get(this);
    const {
      leafletMap,
      data,
      tooltip,
      tooltipOffset,
    } = props;

    console.log('data', data);
    props.mapLayer = L.geoJSON(d3.shuffle(data), {
      pointToLayer(geoPoint, latlng) {
        // console.log('latlng', latlng);
        const color = {
          white: 'blue',
          asian: 'red',
          black: 'green',
          hispanic: 'orange',
        };
        // console.log(color[geoPoint.properties.race]);
        return L.circleMarker(latlng, {
          radius: 2,
          stroke: false,
          fillColor: color[geoPoint.properties.race],
          fillOpacity: 0.75,
        });
      },
    }).addTo(leafletMap);
  },
};

const publicProps = new Props({
  target: privateProps,
  fields: [
    'data',
    'dataPath',
    'leafletMap',
    'render',
  ],
});


class DemographicsLayer {
  constructor() {
    privateProps.set(this, {
      name: 'demographics',
      status: false,
      tooltipOffset: { x: 10, y: 10 },
    });
  }
  init() {
    const props = privateProps.get(this);
    const { name } = props;
    const dataInfo = datasetList.find(d => d.name === name);

    props.dataPath = dataInfo.dataPath;
    props.tooltip = new Tooltip().selection(d3.select('body'));

    return this;
  }
  draw() {
    const props = privateProps.get(this);
    const {
      dataPath,
      data,
      status,
    } = props;
    const {
      draw,
      cleanData,
    } = privateMethods;

    if (status) return;

    if (data === undefined) {
      d3.json(dataPath, (loadedData) => {
        props.data = cleanData.call(this, loadedData);
        draw.call(this);
      });
    } else {
      draw.call(this);
    }
    props.status = true;
  }
  remove() {
    const props = privateProps.get(this);
    const { mapLayer, status } = props;
    if (!status) return;

    props.status = false;
    mapLayer.remove();
  }
}

Object.assign(DemographicsLayer.prototype, publicProps);

export default DemographicsLayer;
