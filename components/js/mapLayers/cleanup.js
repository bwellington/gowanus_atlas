import MapOverlayLayer from '../visualization-components/mapOverlay/mapOverlayLayer';
import Tooltip from '../visualization-components/tooltip';

const privateMethods = {
  drawLayer() {
    const { group, name, data, refreshMap, tooltip } = this.props();
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


    group.selectAll(`.${name}`)
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

            tooltip.position([d3.event.x + 10, d3.event.y + 10])
              .text(text)
              .draw();
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
            tooltip.position([d3.event.x + 10, d3.event.y + 10]).update();
          })
          .on('mouseout', function mouseout(dd) {
            const transitionSpeed = 250;
            tooltip.remove();
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
  },
};

const cleanupLayer = new MapOverlayLayer()
  .type('Polygon')
  .render('Vector')
  .addPropMethods(['dataInfo'])
  .draw(function loadData() {
    // const localProps = privateProps.get(this);
    const { dataInfo, data } = this.props();
    const { dataPath } = dataInfo;
    this._.tooltip = new Tooltip().selection(d3.select('body'));
    if (data === undefined) {
      d3.json(dataPath, (loadedData) => {
        this._.data = loadedData;
        privateMethods.drawLayer.call(this);
      });
    } else {
      privateMethods.drawLayer.call(this);
    }
  });

cleanupLayer.remove = function removeLayer() {
  const { group, name } = this.props();

  group.selectAll(`.${name}`).remove();
};

export default cleanupLayer;
