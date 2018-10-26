import * as topojson from 'topojson-client';
import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import Tooltip from '../visualization-components/tooltip';

const drawStops = function drawStops() {
  const {
    data,
    group,
    name,
    tooltip,
  } = this.props();

  const { busStopsData } = data;

  const stopsGeojson = topojson
    .feature(busStopsData,
        busStopsData.objects.bus_stops_nyc_may2018);
  console.log(stopsGeojson);

  const stopPoints = stopsGeojson.features.map((d) => {
    const point = Object.assign({}, d);
    point.lat = d.geometry.coordinates[1];
    point.lon = d.geometry.coordinates[0];
    return point;
  });


  group.selectAll(`.${name}-layer--stop`)
    .data(stopPoints)
    .enter()
    .append('circle')
    .attrs({
      class: `${name}-layer ${name}-layer--stop`,
      r: 0,
    })
    .on('mouseover click', (d) => {
      const prop = d.properties;
      // scale by d.properties.total_rack
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['Stop: ', `${prop.stop_name}`],
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

const drawRoutes = function drawRoutes() {
  const {
    data,
    group,
    name,
    tooltip,
  } = this.props();

  const { busRoutesData } = data;

  const busRoutesGeojson = topojson
    .feature(busRoutesData, busRoutesData.objects.bus_routes_nyc_may2018);


  group.selectAll(`.${name}-layer--route`)
    .data(busRoutesGeojson.features)
    .enter()
    .append('path')
    .attrs({
      class: `${name}-layer ${name}-layer--route`,
      'stroke-width': 0,
    })
    .on('mouseover click', (d) => {
      const prop = d.properties;
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['Route: ', `${prop.route_long}`],
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

const busLayer = new MapOverlayLayer()
  .addPropMethods(['dataInfo'])
  .draw(function loadData() {
    const {
      data,
      refreshMap,
      dataInfo,
    } = this.props();

    const { dataPath } = dataInfo;
    console.log('path', dataPath);

    this._.tooltip = new Tooltip().selection(d3.select('body'));

    if (data === undefined) {
      d3.json(dataPath.busRoutes, (busRoutesData) => {
        d3.json(dataPath.busStops, (busStopsData) => {
          this._.data = { busRoutesData, busStopsData };
          console.log('bus data', this._.data);
          drawRoutes.call(this);
          drawStops.call(this);

          // drawBikeRacks.call(this);
          refreshMap();
        });
      });
    } else {
      drawRoutes.call(this);
      drawStops.call(this);

      // drawBikeRoutes.call(this);
      // drawBikeRacks.call(this);
      refreshMap();
    }
  })
  .remove(function removeLayer() {
    const { group, name } = this.props();
    group.selectAll(`.${name}-layer`).remove();
  });

export default busLayer;
