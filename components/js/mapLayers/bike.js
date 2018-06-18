import * as topojson from 'topojson-client';
import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import Tooltip from '../visualization-components/tooltip';

const drawBikeRacks = function drawBikeRacks() {
  const {
    data,
    group,
    name,
    tooltip,
  } = this.props();

  const { bikeRacksData } = data;

  const rackPoints = bikeRacksData.features.map((d) => {
    const point = Object.assign({}, d);
    point.lat = d.geometry.coordinates[1];
    point.lon = d.geometry.coordinates[0];
    return point;
  });

  const sizeRange = d3.extent(rackPoints, d => d.properties.total_rack);

  const rackScale = d3.scaleSqrt().domain(sizeRange).range([3, 8]);

  group.selectAll(`.${name}-layer--rack`)
    .data(rackPoints)
    .enter()
    .append('circle')
    .attrs({
      class: `${name}-layer ${name}-layer--rack`,
      r: 0,
    })
    .on('mouseover', (d) => {
      const prop = d.properties;
      // scale by d.properties.total_rack
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['', `${prop.Name}`],
          ['', `${prop.total_rack} rack${prop.total_rack === 1 ? '' : 's'}`],
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
    .attr('r', d => rackScale(d.properties.total_rack));
};

const drawBikeRoutes = function drawBikeRoutes() {
  const {
    data,
    group,
    name,
    tooltip,
  } = this.props();

  const { bikeRoutesData } = data;

  const bikeRoutesGeojson = topojson
    .feature(bikeRoutesData, bikeRoutesData.objects.bikeRoutesDissolved);

  const laneExtent = d3.extent(bikeRoutesGeojson.features,
      d => parseInt(d.properties.lanecount, 10));

  const laneScale = d3.scaleLinear().domain(laneExtent).range([2.5, 4.5]);

  group.selectAll(`.${name}-layer--route`)
    .data(bikeRoutesGeojson.features)
    .enter()
    .append('path')
    .attrs({
      class: `${name}-layer ${name}-layer--route`,
      'stroke-width': 0,
    })
    .on('mouseover', (d) => {
      const prop = d.properties;
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['', `${prop.street}, ${prop.fromstreet} to ${prop.tostreet}`],
          ['', `${prop.lanecount} lane${parseInt(prop.lanecount, 10) === 1 ? '' : 's'}`],
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
    .attr('stroke-width', d => laneScale(parseInt(d.properties.lanecount, 10)));
};

const bikeLayer = new MapOverlayLayer()
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
      d3.json(dataPath.bikeRoutes, (bikeRoutesData) => {
        d3.json(dataPath.bikeRacks, (bikeRacksData) => {
          this._.data = { bikeRoutesData, bikeRacksData };
          drawBikeRoutes.call(this);
          drawBikeRacks.call(this);
          refreshMap();
        });
      });
    } else {
      drawBikeRoutes.call(this);
      drawBikeRacks.call(this);
      refreshMap();
    }
  })
  .remove(function removeLayer() {
    const { group, name } = this.props();
    group.selectAll(`.${name}-layer`).remove();
  });

export default bikeLayer;
