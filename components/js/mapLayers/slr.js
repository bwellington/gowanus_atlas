import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';

const slrLayer = new MapOverlayLayer()
  .type('Polygon')
  .name('slr')
  .render('Vector')
  .addPropMethods(['dataPaths'])
  .draw(function draw() {
    // load data, process data, draw layers
    this.drawLayers();
    return this;
  });

slrLayer.drawLayers = function drawLayers() {
  const { group, key, data } = this.properties();
  // tooltip.pane(pane);
  group.selectAll(`${key}`)
    .data(data)
    .enter()
    .append('g')
    .attrs({
      class: (d, i) => `${key} ${key}${i}`,
      opacity: 0,
    })
    .each(function animateLayers(d, i) {
      d3.select(this).selectAll(`.${key}Layer`)
        .data(d.features)
        .enter()
        .append('path')
        .attrs({
          class: `${key}Layer${i}`,
          fill: 'rgb(173,216,230)',
          'fill-opacity': 0.3,
          cursor: 'pointer',
        })
        .on('mouseover', () => {
          // tooltip.position(d3.mouse(this))
          //   .text(d.properties.text)
          //   .draw();
          d3.selectAll(`.${key}Layer${i}`)
            .transition()
            .duration(150)
            .attrs({
              'fill-opacity': 1,
            });
        })
        .on('mouseout', () => {
          // tooltip.remove();
          d3.selectAll(`.${key}Layer${i}`)
            .transition()
            .duration(250)
            .attrs({
              'fill-opacity': 0.3,
            });
        })
        .on('mousemove', () => {
          // tooltip.position(d3.mouse(this)).update();
        });
    })
    .transition()
    .duration(750)
    .ease(d3.easeQuadInOut)
    .delay((d, i) => (data.length - i - 1) * 750)
    .attrs({
      opacity: 1,
    });
};

export default slrLayer;
