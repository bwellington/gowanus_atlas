import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';

const cleanupLayer = new MapOverlayLayer()
  .type('Polygon')
  .render('Vector')
  .addPropMethods(['dataPath'])
  .draw(function loadData() {
    const { dataPath, data } = this.props();
    if (data === undefined) {
      d3.json(dataPath, (loadedData) => {
        this._.data = loadedData;
        this.drawLayer();
      });
    } else {
      this.drawLayer();
    }
  });

cleanupLayer.drawLayer = function drawLayers() {
  const { group, name, pane, data, refreshMap } = this.props();
  // tooltip.pane(pane);

  const stages = ['1', '2', '3a', '3b'].map((d) => {
    const colors = {
      1: '#cc8500',
      2: '#ffb833',
      '3a': '#ffc966',
      '3b': '#ffdb99',
    };
    return {
      stage: d,
      features: data.features.filter(dd => dd.properties.stage === d),
      color: colors[d],
    };
  });
  const fillOpacity = 0.5;
  const animationSpeed = 750;


  group.selectAll(`${name}`)
    .data(stages)
    .enter()
    .append('g')
    .attrs({
      class: `${name}Layer`,
      opacity: 0,
    })
    .each(function animatePhase(d) {
      const canalStages = d.features.filter(dd => dd.properties.type === 'canal');
      const parcelStages = d.features.filter(dd => dd.properties.type === 'parcel');


      d3.select(this).selectAll(`${name}-canal`)
        .data(canalStages)
        .enter()
        .append('path')
        .attrs({
          class: `${name} ${name}-canal`,
          fill: d.color,
          stroke: d.color,
          'stroke-width': 2,
          'fill-opacity': fillOpacity,
          opacity: 1,
          cursor: 'pointer',
        })
        .on('mouseover', function mouseover(dd) {
          const text = [['Cleanup Stage: ', dd.properties.stage]];
          const transitionSpeed = 150;
          // tooltip.position(d3.mouse(this))
          //   .text(text)
          //   .draw();
          d3.select(this)
            .transition()
            .duration(transitionSpeed)
            .attrs({
              'fill-opacity': 1,
            });

          d3.selectAll(`.${name}-parcel__${dd.properties.stage}`)
            .transition()
            .duration(transitionSpeed)
            .attrs({
              'stroke-width': 1.5,
            });
        })
        .on('mousemove', () => {
          // tooltip.position(d3.mouse(this)).update();
        })
        .on('mouseout', function mouseout(dd) {
          const transitionSpeed = 250;
          // tooltip.remove();
          d3.select(this)
            .transition()
            .duration(transitionSpeed)
            .attrs({
              'fill-opacity': fillOpacity,
            });
          d3.selectAll(`.${name}-parcel__${dd.properties.stage}`)
            .transition()
            .duration(transitionSpeed)
            .attrs({
              'stroke-width': 0.75,
            });
        });

      d3.select(this).selectAll(`${name}-parcel`)
        .data(parcelStages)
        .enter()
        .append('path')
        .attrs({
          class: `${name} ${name}-parcel ${name}-parcel__${d.stage}`,
          fill: 'none',
          stroke: d.color,
          'stroke-width': 0.75,
          opacity: 0.75,
          'stroke-dasharray': '3,2',
        });
    })
    .transition()
    .duration(animationSpeed)
    .ease(d3.easeQuadInOut)
    .delay((d, i) => i * animationSpeed)
    // .delay((d,i) => (stages.length - i - 1) * 400)
    .attrs({
      opacity: 1,
    });

  refreshMap();
};

cleanupLayer.remove = function removeLayer() {
  const { group, name } = this.props();

  group.selectAll(`.${name}`).remove();
};

export default cleanupLayer;
