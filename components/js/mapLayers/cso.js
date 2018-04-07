import * as topojson from 'topojson-client';
import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import Tooltip from '../visualization-components/tooltip';

const csoLayer = new MapOverlayLayer()
  .type('Polygon')

  .render('Vector')
  .addPropMethods(['dataInfo'])
  .draw(function loadData() {
    const { dataInfo, data, refreshMap } = this.props();
    const { dataPath } = dataInfo;
    this._.tooltip = new Tooltip().selection(d3.select('body'));
    if (data === undefined) {
      d3.json(dataPath.csoOutfall, (csoOutfall) => {
        d3.json(dataPath.csoArea, (csoArea) => {
          this._.data = { csoOutfall, csoArea };
          this.drawCsoArea();
          this.drawCsoOutfall();
          refreshMap();
        });
      });
    } else {
      this.drawCsoArea();
      this.drawCsoOutfall();
      refreshMap();
    }
  });

csoLayer.toggleActive = function toggleActive(outfallId, toggle) {
  const { name, group } = this.props();
  group.selectAll(`.${name}-layer--${outfallId}`)
    .classed(`${name}-layer--active`, toggle);
  group.selectAll(`.${name}-layer-circle--${outfallId}`)
    .classed(`${name}-layer-circle--active`, toggle);
};

csoLayer.drawCsoOutfall = function drawOutfall() {
  const { data, group, name, tooltip } = this.props();
  const outfallExtent = d3.extent(data.csoOutfall.features.filter(d => d !== null),
    d => d.properties.volume_16);

  const radiusScale = d3.scaleSqrt()
    .domain(outfallExtent)
    .range([5, 40]);
  const points = data.csoOutfall.features
    .map((d) => {
      const point = Object.assign({}, d);
      point.lat = d.geometry.coordinates[1];
      point.lon = d.geometry.coordinates[0];
      return point;
    });
  group.selectAll(`.${name}-layer-circle`)
    .data(points.filter(d => d.properties.volume_16 !== null))
    .enter()
    .append('circle')
    .attrs({
      r: 0,
      class: (d) => {
        const baseClass = `${name}-layer-circle ${name}-layer-circle--${d.properties.outfall_id}`;
        if (d.properties.volume_16 === null) {
          return `${baseClass} ${baseClass}--null`;
        }
        return baseClass;
      },
    })
    .on('mouseover', (d) => {
      this.toggleActive(d.properties.outfall_id, true);
      if (d.properties.volume_16 === null) {
        tooltip
          .position([d3.event.x + 10, d3.event.y + 10])
          .text([
            ['', 'No Data'],
          ])
          .draw();
      } else {
        tooltip
          .position([d3.event.x + 10, d3.event.y + 10])
          .text([
            ['CSO Volume (2016): ', `${d.properties.volume_16} (millions of gallons)`],
          ])
          .draw();
      }
    })
    .on('mousemove', () => {
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .update();
    })
    .on('mouseout', (d) => {
      this.toggleActive(d.properties.outfall_id, false);
      tooltip.remove();
    })
    .transition()
    .duration(500)
    .delay((d, i) => i * 75)
    .attr('r', d => (d.properties.volume_16 !== null ? radiusScale(d.properties.volume_16) : 5));
};

csoLayer.drawCsoArea = function drawLayer() {
  const { data, group, name, tooltip } = this.props();
  const csoAreaGeojson = topojson.feature(data.csoArea, data.csoArea.objects.cso);

  group.selectAll(`.${name}-layer`)
    .data(csoAreaGeojson.features)
    .enter()
    .append('path')
    .attrs({
      class: d => `${name}-layer ${name}-layer--${d.properties.outfall}`,
      opacity: 0,
    })
    .on('mouseover', (d) => {
      this.toggleActive(d.properties.outfall, true);
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .text([
          ['Stormwater Runoff in 1 Inch Storm: ', `${d.properties.stormwat_1} (millions of gallons)`],
          ['Outfall: ', d.properties.outfall],
          ['Water Usage: ', `${d.properties.water_use} (gallons per day)`],
          ['Population: ', d.properties.population],
        ])
        .draw();
    })
    .on('mousemove', () => {
      tooltip
        .position([d3.event.x + 10, d3.event.y + 10])
        .update();
    })
    .on('mouseout', (d) => {
      this.toggleActive(d.properties.outfall, false);
      tooltip.remove();
    })
    .transition()
    .duration(500)
    .attrs({
      opacity: 0.8,
    });
};

csoLayer.remove = function removeLayer() {
  const { group, name } = this.props();

  group.selectAll(`.${name}-layer`).remove();
  group.selectAll(`.${name}-layer-circle`).remove();
};

export default csoLayer;
