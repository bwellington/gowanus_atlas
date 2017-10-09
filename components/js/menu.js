import Props from './visualization-components/props';

const props = new Props([
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

class Menu {
  constructor() {
    props.addTo(this);
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

    console.log('interview menu items', interviews);

    const rows = container.selectAll('.menu__row')
      .data(interviews)
      .enter()
      .append('div')
      .attr('class', 'menu__row menu__section menu__default__row')
      .on('click', onInterviewClick);

    rows.append('div')
      .attr('class', 'menu__category menu__header')
      .text(d => d.category);

    rows.append('div')
      .attr('class', 'menu__name')
      .text(d => d.fullName);

    rows.append('div')
      .attr('class', 'menu__name-title')
      .text(d => d.title);
  }
  drawInterview() {
    const { container, view, onBackClick, onLayerClick } = this.props();
    this._.activeLayers = view.interview.layers;


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

    console.log(view.interview.layers);
    this._.menuLayers = container.selectAll('.menu__map-layer')
      .data(view.interview.layers)
      .enter()
      .append('div')
      .attr('class', 'menu__map-layer-row')
      .append('span')
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
