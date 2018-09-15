import * as topojson from 'topojson-client';
import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import Tooltip from '../visualization-components/tooltip';

const drawStations = function drawStations() {
  const {
    data,
    group,
    name,
    tooltip,
  } = this.props();

  const { subwayStationsData } = data;

  const stationsGeojson = topojson
    .feature(subwayStationsData,
        subwayStationsData.objects.subwaystations);
  console.log(stationsGeojson);

  const stationPoints = stationsGeojson.features.map((d) => {
    const point = Object.assign({}, d);
    point.lat = d.geometry.coordinates[1];
    point.lon = d.geometry.coordinates[0];
    return point;
  });


  group.selectAll(`.${name}-layer--station`)
    .data(stationPoints)
    .enter()
    .append('circle')
    .attrs({
      class: `${name}-layer ${name}-layer--station`,
      r: 0,
    })
    .on('mouseover', (d) => {
      const prop = d.properties;
      console.log('station', d);
      // scale by d.properties.total_rack
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['Station: ', `${prop.name}`],
          ['Line: ', `${prop.line}`],
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
    .delay((d, i) => i)
    .duration(750)
    .attr('r', 5);
};

const drawLines = function drawLines() {
  const {
    data,
    group,
    name,
    tooltip,
  } = this.props();

  const { subwayLinesData } = data;

  const subwayLinesGeojson = topojson
    .feature(subwayLinesData, subwayLinesData.objects.subwaylines);


  group.selectAll(`.${name}-layer--line`)
    .data(subwayLinesGeojson.features)
    .enter()
    .append('path')
    .attrs({
      class: `${name}-layer ${name}-layer--line`,
      'stroke-width': 0,
    })
    .on('mouseover', (d) => {
      const prop = d.properties;
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['Line: ', `${prop.name}`],
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
    .duration(750)
    .attr('stroke-width', 3);
};

const subwayLayer = new MapOverlayLayer()
  .addPropMethods(['dataInfo'])
  .draw(function loadData() {
    const {
      data,
      refreshMap,
      dataInfo,
    } = this.props();

    const { dataPath } = dataInfo;

    this._.tooltip = new Tooltip().selection(d3.select('body'));

    if (data === undefined) {
      d3.json(dataPath.subwayLines, (subwayLinesData) => {
        d3.json(dataPath.subwayStations, (subwayStationsData) => {
          this._.data = { subwayLinesData, subwayStationsData };
          console.log('dtaa', this._.data);
          drawLines.call(this);
          drawStations.call(this);

          // drawBikeRacks.call(this);
          refreshMap();
        });
      });
    } else {
      drawLines.call(this);
      drawStations.call(this);

      // drawBikeRoutes.call(this);
      // drawBikeRacks.call(this);
      refreshMap();
    }
  })
  .remove(function removeLayer() {
    const { group, name } = this.props();
    group.selectAll(`.${name}-layer`).remove();
  });

export default subwayLayer;
