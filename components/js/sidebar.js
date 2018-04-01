import Props from './visualization-components/privateProps';

const privateProps = new WeakMap();

const privateMethods = {
  toggleVisibility() {
    const {
      container,
      selectedInterview,
    } = privateProps.get(this);
    if (container === undefined) return;
    const toggleClass = () => container.classed('sidebar--hidden', selectedInterview === undefined);

    if (selectedInterview === undefined) {
      container
        .transition()
        .duration(500)
        .style('opacity', 0)
        .on('end', toggleClass);
    } else {
      container
        .transition()
        .duration(500)
        .style('opacity', 1)
        .on('end', toggleClass);
    }
  },
  clearInterview() {
    const { contentContainer } = privateProps.get(this);
    if (contentContainer === undefined) return;
    contentContainer.remove();
  },
  drawInterview() {
    const props = privateProps.get(this);
    const {
      container,
      onCloseClick,
      selectedInterview,
      mapLayers,
    } = props;

    const {
      drawLayerButtons,
      clearInterview,
    } = privateMethods;

    clearInterview.call(this);

    props.contentContainer = container
      .append('div')
      .attr('class', 'sidebar__content-container');

    const { contentContainer } = props;

    const closeButton = contentContainer
      .append('div')
      .attr('class', 'sidebar__close-button-row')
      .append('div')
      .attr('class', 'sidebar__close-button');

    closeButton
      .append('div')
      .attr('class', 'sidebar__close-button-icon')
      .html('<i class="window close outline icon"></i>');

    closeButton
      .on('click', onCloseClick)
      .on('mouseover', function fillButton() {
        d3.select(this)
          .select('.sidebar__close-button-icon')
          .html('<i class="window close icon"></i>');
      })
      .on('mouseout', function emptyButton() {
        d3.select(this)
          .select('.sidebar__close-button-icon')
          .html('<i class="window close outline icon"></i>');
      });

    contentContainer
      .append('div')
      .attr('class', 'sidebar__header')
      .text(`${selectedInterview.fullName}, ${selectedInterview.title}`);

    contentContainer
      .append('div')
      .attr('class', 'sidebar__section sidebar__video')
      .html(`<iframe src="${selectedInterview.videoPath}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`);

    contentContainer
      .append('div')
      .attr('class', 'sidebar__section sidebar__interview-description')
      .text(selectedInterview.description);

    contentContainer
      .append('div')
      .attr('class', 'sidebar__section  sidebar__header')
      .text('Map Layers');

    props.layers = selectedInterview
      .layers
      .map(d => mapLayers.find(dd => dd.name === d));

    props.buttonContainer = contentContainer
      .append('div')
      .attr('class', 'sidebar__button-container');

    drawLayerButtons.call(this);

    props.menuLayers = contentContainer.selectAll('.sidebar__map-layer');
  },
  drawLayerButtons() {
    const props = privateProps.get(this);
    const {
      buttonContainer,
      layers,
      onLayerClick,
    } = props;

    buttonContainer
      .selectAll('.sidebar__map-layer')
      .data(layers)
      .enter()
      .append('div')
      .on('click', (d) => {
        onLayerClick(d.name);
      })
      .attr('class', 'sidebar__map-layer')
      .text(d => d.fullName);
  },
  setLayerColors() {
    const { menuLayers, selectedLayers } = privateProps.get(this);

    if (menuLayers === undefined || selectedLayers === undefined) return;

    menuLayers.classed('sidebar__map-layer--active', d => selectedLayers.includes(d.name));
  },
};

const publicMethods = {
  init() {
    this.updateInterview();
    this.updateLayers();
    return this;
  },
  updateLayers() {
    const { selectedInterview } = privateProps.get(this);
    const {
      setLayerColors,
    } = privateMethods;

    if (selectedInterview === undefined) return;
    setLayerColors.call(this);
  },
  updateInterview() {
    const { selectedInterview } = privateProps.get(this);
    const {
      drawInterview,
      setLayerColors,
      toggleVisibility,
    } = privateMethods;


    if (selectedInterview === undefined) {
      toggleVisibility.call(this);
    } else {
      drawInterview.call(this);
      setLayerColors.call(this);
      toggleVisibility.call(this);
    }
  },
};

const publicProps = new Props({
  target: privateProps,
  fields: [
    'container',
    'mapLayers',
    'onLayerClick',
    'onCloseClick',
    'selectedInterview',
    'selectedLayers',
  ],
});

class Sidebar {
  constructor() {
    privateProps.set(this, {});
  }
}

Object.assign(Sidebar.prototype, publicMethods, publicProps);

export default Sidebar;
