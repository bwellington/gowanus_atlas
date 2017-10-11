import * as topojson from 'topojson-client';
import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import Tooltip from '../visualization-components/tooltip';


const slrLayer = new MapOverlayLayer()
  .type('Polygon')
  .render('Vector')
  .addPropMethods(['dataPath'])
  .draw(function loadData() {
    const { dataPath, map, data } = this.props();
    this._.tooltip = new Tooltip().selection(d3.select(map.getPanes().overlayPane));
    // console.log(map.getPanes().mapPane.style.transform);
    if (data === undefined) {
      const q = d3.queue();
      dataPath.forEach((d) => {
        q.defer(d3.json, d);
      });
      const text = {
        '75in_clip': {
          year: '2100s',
          level: '75"',
        },
        '58in_clip': {
          year: '2080s',
          level: '58"',
        },
        '30in_clip': {
          year: '2050s',
          level: '30"',
        },
        '10in_clip': {
          year: '2020s',
          level: '10"',
        },
      };
      q.awaitAll((error, results) => {
        const cleanResults = results.map((d) => {
          const layerName = Object.keys(d.objects)[0];
          const layerGeo = topojson.feature(d, d.objects[layerName]);
          layerGeo.layerProps = text[layerName];
          return layerGeo;
        });
        this.data(cleanResults);
        this.drawLayers();
      });
    } else {
      this.drawLayers();
    }
  });

slrLayer.drawLayers = function drawLayers() {
  const { group, name, data, refreshMap, tooltip } = this.props();


  group.selectAll(`.${name}`)
    .data(data)
    .enter()
    .append('g')
    .attrs({
      class: (d, i) => `${name} ${name}${i}`,
      opacity: 0,
    })
    .each(function animateLayers(d, i) {
      d3.select(this).selectAll(`.${name}Layer`)
        .data(d.features)
        .enter()
        .append('path')
        .attrs({
          class: `${name}Layer${i}`,
          fill: 'rgb(173,216,230)',
          'fill-opacity': 0.3,
          cursor: 'pointer',
        })
        .on('mouseover', function mouseover() {
          tooltip.position(d3.mouse(this))
            .text([
              ['Level: ', d.layerProps.level],
              ['Year: ', d.layerProps.year],
            ])
            .draw();
          d3.selectAll(`.${name}Layer${i}`)
            .transition()
            .duration(150)
            .attrs({
              'fill-opacity': 1,
            });
        })
        .on('mouseout', () => {
          tooltip.remove();
          d3.selectAll(`.${name}Layer${i}`)
            .transition()
            .duration(250)
            .attrs({
              'fill-opacity': 0.3,
            });
        })
        .on('mousemove', () => {
          tooltip.position(d3.mouse(this)).update();
        });
    })
    .transition()
    .duration(750)
    .ease(d3.easeQuadInOut)
    .delay((d, i) => (data.length - i - 1) * 750)
    .attrs({
      opacity: 1,
    });
  refreshMap();
};

slrLayer.remove = function removeLayer() {
  const { group, name } = this.props();

  group.selectAll(`.${name}`).remove();
};

export default slrLayer;
