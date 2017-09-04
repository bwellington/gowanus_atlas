import ChainableObject from './visualization-components/chainableObject';

class Menu extends ChainableObject {
  constructor() {
    super([
      'selection',
      'position',
      'interviews',
      'status',
      'onInterviewClick',
      'onBackClick',
      'onLayerClick',
      'view',
      'size',
    ]);
  }
  draw() {
    const { selection } = this.props();
    this._.container = selection.append('div')
      .attr('class', 'menu__container');
    this.update();
    return this;
  }
  update() {
    const { view, container } = this.props();
    container.selectAll('div').remove();


    if (view.type === 'default') {
      this.drawDefault();
    } else if (view.type === 'interview') {
      this.drawInterview();
    }
  }
  drawDefault() {
    const { container, interviews, onInterviewClick } = this.props();


    const rows = container.selectAll('.menu__row')
      .data(interviews)
      .enter()
      .append('div')
      .attr('class', 'menu__row')
      .on('click', onInterviewClick);

    rows.append('div')
      .text(d => d.fullName);
  }
  drawInterview() {
    const { container, view, onBackClick, onLayerClick } = this.props();
    this._.activeLayers = view.interview.layers;


    container.append('div')
      .attr('class', 'menu__back-button')
      .on('click', onBackClick)
      .text('back');

    container
      .append('div')
      .attr('class', 'menu__video')
      .html(`<iframe src="${view.interview.videoPath}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`);

    container
      .append('div')
      .text('Map Layers');

    this._.menuLayers = container.selectAll('.menu__map-layer')
      .data(view.interview.layers)
      .enter()
      .append('div')
      .attr('class', 'menu__map-layer')
      .text(d => d)
      .on('click', (d) => {
        let newLayers;
        const { activeLayers } = this.props();
        if (activeLayers.includes(d)) {
          const index = activeLayers.indexOf(d);
          newLayers = [...activeLayers.slice(0, index), ...activeLayers.slice(index + 1)];
        } else {
          newLayers = activeLayers.slice(0);
          newLayers.push(d);
        }
        this._.activeLayers = newLayers;
        onLayerClick(newLayers);
      });
    this.updateMenuLayers();
  }
  updateMenuLayers() {
    const { menuLayers, activeLayers } = this.props();

    menuLayers.classed('menu__map-layer--active', d => activeLayers.includes(d));
  }
}

export default Menu;
