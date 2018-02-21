import Props from './visualization-components/privateProps';

const privateProps = new WeakMap();

const privateMethods = {
  initMenu() {
    const props = privateProps.get(this);
    const { selection } = props;
    const { drawButtons } = privateMethods;
    props.container = selection.append('div')
      .attr('class', 'menu__container');
    // drawButtons.call(this);
  },
  drawButtons() {
    const props = privateProps.get(this);
    const { selection } = props;

    selection.append('div')
      .attr('class', 'menu__tab menu__tab--stories')
      .append('span')
      .attr('class', 'menu__tab-button menu__tab-button--stories')
      .text('STORIES');
  },
  drawDefault() {
    const props = privateProps.get(this);
    const { container, interviews, onInterviewClick } = props;

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
    const selectedInterview = view.interview;
    console.log('view', selectedInterview);

    props.activeLayers = view.interview.layers;


    container.append('div')
      .attr('class', 'menu__back-button-row')
      .append('span')
      .attr('class', 'menu__back-button')
      .on('click', onBackClick)
      .text('<< BACK');

    container
      .append('div')
      .attr('class', 'menu__header')
      .text(`${selectedInterview.fullName}, ${selectedInterview.title}`);

    container
      .append('div')
      .attr('class', 'menu__section menu__video')
      .html(`<iframe src="${selectedInterview.videoPath}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`);

    container
      .append('div')
      .attr('class', 'menu__section menu__interview-description')
      .text(selectedInterview.description);

    container
      .append('div')
      .attr('class', 'menu__section  menu__header')
      .text('Map Layers');


    props.menuLayers = container.selectAll('.menu__map-layer')
      .data(selectedInterview.layers)
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
    const { initMenu } = privateMethods;
    initMenu.call(this);
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
