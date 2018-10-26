import * as topojson from 'topojson-client';
import Props from '../visualization-components/privateProps';
import datasetList from '../datasetList';
import Tooltip from '../visualization-components/tooltip';

const privateProps = new WeakMap();
const privateMethods = {
  cleanData(rawData) {
    console.log('rawdata', rawData);
    return topojson.feature(rawData, rawData.objects.over64_10).features;
  },
  draw() {
    const props = privateProps.get(this);
    const {
      leafletMap,
      data,
      tooltip,
      tooltipOffset,
    } = props;

    props.mapLayer = L.geoJSON(d3.shuffle(data), {
      pointToLayer(geoPoint, latlng) {
        // console.log('latlng', latlng);

        // console.log(color[geoPoint.properties.race]);
        return L.circleMarker(latlng, {
          radius: 2,
          stroke: false,
          fillColor: 'rgba(242, 60, 80, 1)',
          fillOpacity: 0.75,
        })
        .on('mouseover click', (e) => {
          const text = '1 Dot = 10 People';
          const pos = [
            e.containerPoint.x + tooltipOffset.x,
            e.containerPoint.y + tooltipOffset.y,
          ];
          tooltip
              .position(pos)
              .text([
                ['', 'Red Dot = > 64 Years Old'],
                ['', text],
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


class SeniorLayer {
  constructor() {
    privateProps.set(this, {
      name: 'senior',
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

Object.assign(SeniorLayer.prototype, publicProps);

export default SeniorLayer;
