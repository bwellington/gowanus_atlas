import * as topojson from 'topojson-client';
import Props from '../visualization-components/privateProps';
import datasetList from '../datasetList';
import Tooltip from '../visualization-components/tooltip';
import Legend from '../legend';

const privateProps = new WeakMap();

const color = {
  white: 'blue',
  asian: 'red',
  black: 'green',
  hispanic: 'orange',
};
const raceText = {
  white: 'Blue Dot = White, Not Hispanic',
  asian: 'Red Dot = Asian, Not Hispanic',
  black: 'Green Dot = Black, Not Hispanic',
  hispanic: 'Orange Dot = Hispanic',
};

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

    // console.log('data', data);
    props.mapLayer = L.geoJSON(d3.shuffle(data), {
      pointToLayer(geoPoint, latlng) {
        // console.log('latlng', latlng);

        // console.log(color[geoPoint.properties.race]);
        return L.circleMarker(latlng, {
          radius: 2,
          stroke: false,
          fillColor: color[geoPoint.properties.race],
          fillOpacity: 0.75,
        })
        .on('mouseover', (e) => {
        //   console.log('props', geoPoint.properties);

          const pos = [
            e.containerPoint.x + tooltipOffset.x,
            e.containerPoint.y + tooltipOffset.y,
          ];
          tooltip
              .position(pos)
              .text([
                ['', raceText[geoPoint.properties.race]],
                ['', '1 Dot = 10 People'],
              ])
              .draw();
        })
        .on('mousemove', (e) => {
          const pos = [
            e.containerPoint.x + tooltipOffset.x,
            e.containerPoint.y + tooltipOffset.y,
          ];
          tooltip
            .position(pos)
            .update();
        })
        .on('mouseout', () => {
          tooltip.remove();
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

    props.dataInfo = dataInfo;

    return this;
  }
  draw() {
    const props = privateProps.get(this);
    const {
      dataPath,
      data,
      status,
      dataInfo,
      name,
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

    const legendContent = Object.keys(raceText)
      .map(d => ({
        text: raceText[d].split('=')[1],
        type: 'dot',
        color: color[d],
      }));

    props.legend = new Legend({
      name,
      title: dataInfo.fullName,
      content: legendContent,
    });

    props.legend.draw();
  }
  remove() {
    const props = privateProps.get(this);
    const { mapLayer, status, legend } = props;
    if (!status) return;

    props.status = false;
    mapLayer.remove();
    legend.remove();
  }
}

Object.assign(DemographicsLayer.prototype, publicProps);

export default DemographicsLayer;
