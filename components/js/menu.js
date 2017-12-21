import Props from './visualization-components/privateProps';

const privateProps = new WeakMap();

const privateMethods = {
  drawDefault() {
    const props = privateProps.get(this);
    const { container, interviews, onInterviewClick } = props;

    console.log(interviews);
    const rows = container.selectAll('.menu__row')
      .data(interviews)
      .enter()
      .append('div')
      .attr('class', 'menu__row menu__section menu__default__row');

    rows.append('div')
      .attr('class', 'menu__category menu__header')
      .text(d => d.category)
      .append('hr')
      .attr('class', 'menu__category-hr');

    const interviewContainers = rows.append('div')
      .attr('class', 'menu__interview-container');

    interviewContainers.append('div')
      .attr('class', 'menu__name')
      .text(d => d.fullName);

    interviewContainers.append('div')
      .attr('class', 'menu__name-title')
      .text(d => d.title);

    interviewContainers.on('click', onInterviewClick);
  },
  drawInterview() {
    const props = privateProps.get(this);
    const { container, view, onBackClick, onLayerClick } = props;
    props.activeLayers = view.interview.layers;


    container.append('div')
      .attr('class', 'menu__section menu__back-button-row')
      .append('span')
      .attr('class', 'menu__back-button')
      .on('click', onBackClick)
      .text('<< BACK');

    container
      .append('div')
      .attr('class', 'menu__section menu__video')
      .html(`<iframe src="${view.interview.videoPath}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`);

    container
      .append('div')
      .attr('class', 'menu__section menu__interview-description')
      .text(view.interview.description);

    container
      .append('div')
      .attr('class', 'menu__section  menu__header')
      .text('Map Layers');


    props.menuLayers = container.selectAll('.menu__map-layer')
      .data(view.interview.layers)
      .enter()
      .append('div')
      .attr('class', 'menu__map-layer-row')
      .append('span')
      .attr('class', 'menu__map-layer')
      .text(d => d)
      .on('click', (d) => {
        let newLayers;
        const { activeLayers } = props;
        if (activeLayers.includes(d)) {
          const index = activeLayers.indexOf(d);
          newLayers = [...activeLayers.slice(0, index), ...activeLayers.slice(index + 1)];
        } else {
          newLayers = activeLayers.slice(0);
          newLayers.push(d);
        }
        props.activeLayers = newLayers;
        onLayerClick(newLayers);
      });
    this.updateMenuLayers();
  },
};

const publicPropMethods = new Props({
  target: privateProps,
  fields: [
    'selection',
    'position',
    'interviews',
    'status',
    'onInterviewClick',
    'onBackClick',
    'onLayerClick',
    'view',
    'size',
  ],
});

class Menu {
  constructor() {
    const defaultProps = {};
    privateProps.set(this, defaultProps);
    publicPropMethods.addTo(Menu.prototype);
  }
  init() {
    const props = privateProps.get(this);
    const { selection } = props;
    props.container = selection.append('div')
      .attr('class', 'menu__container');
    this.update();
    return this;
  }
  update() {
    const props = privateProps.get(this);
    const { view, container } = props;
    const { drawDefault, drawInterview } = privateMethods;
    container.selectAll('div').remove();


    if (view.type === 'default') {
      drawDefault.call(this);
    } else if (view.type === 'interview') {
      drawInterview.call(this);
    }
  }
  updateMenuLayers() {
    const props = privateProps.get(this);
    const { menuLayers, activeLayers } = props;

    menuLayers.classed('menu__map-layer--active', d => activeLayers.includes(d));
  }
}

export default Menu;
