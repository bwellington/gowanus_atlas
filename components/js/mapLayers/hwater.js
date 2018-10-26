import * as topojson from 'topojson-client';
import Tooltip from '../visualization-components/tooltip';
import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import { removeLayer } from './defaultLoadData';

let drawing = false;

const historicWaterLayer = new MapOverlayLayer()
  .addPropMethods(['dataInfo'])
  .draw(function loadData() {
    const {
      dataInfo,
      data,
      refreshMap,
    } = this.props();

    const { dataPath } = dataInfo;
    this._.tooltip = new Tooltip().selection(d3.select('body'));

    if (data === undefined) {
      d3.json(dataPath.hWater, (hWater) => {
        d3.json(dataPath.hWetlands, (hWetlands) => {
          this._.data = { hWater, hWetlands };
          this.drawLayer();
          refreshMap();
        });
      });
    } else {
      this.drawLayer();
      refreshMap();
    }
  })
  .remove(function remove() {
    removeLayer.call(this);
    drawing = false;
  });

const animationSpeed = 750;

const drawWetlands = function drawWetlands() {
  const {
    data,
    group,
    name,
    tooltip,
    refreshMap,
  } = this.props();

  if (!drawing) return;

  const { hWetlands } = data;
  const wetlandGeojson = topojson.feature(hWetlands, hWetlands.objects.hwetlands).features;

  group.selectAll(`.${name}-layer--hwetlands`)
    .data(wetlandGeojson)
    .enter()
    .append('path')
    .attrs({
      class: `${name}-layer ${name}-layer--hwetlands`,
      opacity: 0,
    })
    .style('pointer-events', 'none')
    .on('mouseover click', () => {
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['', 'Historic Wetlands'],
        ])
        .draw();
    })
    .on('mousemove', () => {
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .update();
    })
    .on('mouseout', () => {
      tooltip.remove();
    })
    .transition()
    .duration(animationSpeed)
    .attr('opacity', 1)
    .on('end', () => {
      d3.selectAll(`.${name}-layer--hwater`).raise();
      d3.selectAll(`.${name}-layer`)
        .style('pointer-events', 'auto');
      drawing = false;
    });
  refreshMap();
};

const drawWater = function drawWater() {
  const {
    data,
    group,
    name,
    tooltip,
  } = this.props();

  const { hWater } = data;


  group.selectAll(`.${name}-layer--hwater`)
    .data(topojson.feature(hWater, hWater.objects.hwater).features)
    .enter()
    .append('path')
    .attrs({
      class: `${name}-layer ${name}-layer--hwater`,
      opacity: 0,
    })
    .style('pointer-events', 'none')
    .on('mouseover click', () => {
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['', 'Historic Water'],
        ])
        .draw();
    })
    .on('mousemove', () => {
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .update();
    })
    .on('mouseout', () => {
      tooltip.remove();
    })
    .transition()
    .duration(animationSpeed)
    .attr('opacity', 1)
    .on('end', drawWetlands.bind(this));
};


historicWaterLayer.drawLayer = function drawLayer() {
  drawing = true;
  drawWater.call(this);
};

export default historicWaterLayer;
