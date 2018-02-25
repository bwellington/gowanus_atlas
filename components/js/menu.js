import Props from './visualization-components/privateProps';

const privateProps = new WeakMap();

const privateMethods = {
  initMenu() {
    const props = privateProps.get(this);
    const { selection } = props;
    const { drawTabs } = privateMethods;
    console.log('init menu');
    props.container = selection.append('div')
      .attr('class', 'menu__container');
    drawTabs.call(this);
  },
  clearMenu() {
    const { container } = privateProps.get(this);
    container.selectAll('div').remove();
  },
  setTabAppearances() {
    const {
      storiesTab,
      allDataTab,
      view,
    } = privateProps.get(this);
    if (view === 'storiesList' || view === 'interview') {
      storiesTab.attr('src', 'png/tabs-04.png');
      allDataTab.attr('src', 'png/tabs-01.png');
    } else if (view === 'allData') {
      storiesTab.attr('src', 'png/tabs-03.png');
      allDataTab.attr('src', 'png/tabs-02.png');
    }
  },
  drawTabs() {
    const props = privateProps.get(this);
    const { selection, onTabClick } = props;
    const { setTabAppearances } = privateMethods;

    props.storiesTab = selection.append('img')
      .attrs({
        class: 'menu__tab menu__tab--stories',
      })
      .on('mouseover', function storiesMouseover() {
        d3.select(this).attr('src', 'png/tabs-04.png');
      })
      .on('mouseout', () => {
        setTabAppearances.call(this);
      })
      .on('click', () => {
        if (props.selectedInterview === undefined) {
          onTabClick('storiesList');
        } else {
          onTabClick('interview');
        }
        setTabAppearances.call(this);
      });

    props.allDataTab = selection.append('img')
      .attrs({
        class: 'menu__tab menu__tab--allData',
        src: 'png/tabs-01.png',
      })
      .on('mouseover', function allDataMouseover() {
        d3.select(this).attr('src', 'png/tabs-02.png');
      })
      .on('mouseout', () => {
        setTabAppearances.call(this);
      })
      .on('click', () => {
        onTabClick('allData');
        setTabAppearances.call(this);
      });

    setTabAppearances.call(this);
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
    const {
      container,
      onBackClick,
      selectedInterview,
      mapLayers,
    } = props;

    const {
      drawLayerButtons,
    } = privateMethods;


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

    const layers = selectedInterview
      .layers.map(d => mapLayers.find(dd => dd.name === d));

    const buttonContainer = container
      .append('div')
      .attr('class', 'menu__button-container');

    drawLayerButtons
      .call(this, {
        layers,
        buttonContainer,
      });

    props.menuLayers = container.selectAll('.menu__map-layer');
  },
  drawLayerButtons({ layers, buttonContainer }) {
    const props = privateProps.get(this);
    const {
      onLayerClick,
    } = props;

    buttonContainer
      .selectAll('.menu__map-layer')
      .data(layers)
      .enter()
      .append('div')
      .on('click', (d) => {
        onLayerClick(d.name);
      })
      .attr('class', 'menu__map-layer')
      .text(d => d.fullName);
  },
  drawAllData() {
    const props = privateProps.get(this);
    const {
      container,
      mapLayers,
    } = props;
    const { drawLayerButtons } = privateMethods;
    const boundDrawLayerButtons = drawLayerButtons.bind(this);

    const categories = [...new Set(mapLayers.map(d => d.category))];

    const menuRows = container.selectAll('.menu__button-row')
      .data(categories)
      .enter()
      .append('div')
      .attr('class', 'menu__button-row');

    menuRows
      .append('div')
      .attr('class', 'menu__row-title')
      .text(d => d);

    menuRows
      .append('div')
      .attr('class', 'menu__button-container')
      .each(function addButtons(d) {
        boundDrawLayerButtons({
          layers: mapLayers.filter(dd => dd.category === d),
          buttonContainer: d3.select(this),
        });
      });

    props.menuLayers = container.selectAll('.menu__map-layer');
    // const buttonContainer = container
    //   .append('div')
    //   .attr('class', 'menu__button-container');
    // drawLayerButtons
    //   .call(this, {
    //     layers: mapLayers,
    //     buttonContainer,
    //   });
  },
};

const publicPropMethods = new Props({
  target: privateProps,
  fields: [
    'position',
    'interviews',
    'mapLayers',
    'onInterviewClick',
    'onBackClick',
    'onLayerClick',
    'onTabClick',
    'selectedInterview',
    'selectedLayers',
    'selection',
    'size',
    'status',
    'view',
  ],
});

class Menu {
  constructor() {
    const defaultProps = {
      tabSize: { width: 42, height: 317 },
    };
    privateProps.set(this, defaultProps);
    publicPropMethods.addTo(Menu.prototype);
  }
  init() {
    const { initMenu } = privateMethods;

    initMenu.call(this);
    this.update();
    return this;
  }
  update() {
    const props = privateProps.get(this);
    const { view, container } = props;
    const {
      clearMenu,
      drawDefault,
      drawInterview,
      drawAllData,
    } = privateMethods;

    clearMenu.call(this);
    if (view === 'storiesList') {
      drawDefault.call(this);
    } else if (view === 'interview') {
      drawInterview.call(this);
    } else if (view === 'allData') {
      drawAllData.call(this);
    }
    this.updateMenuLayers();
    container.classed('menu__container--allData', view === 'allData');
  }
  updateMenuLayers() {
    const props = privateProps.get(this);
    const { menuLayers, selectedLayers } = props;
    if (selectedLayers === undefined || menuLayers === undefined) return;

    menuLayers.classed('menu__map-layer--active', d => selectedLayers.includes(d.name));
  }
}

export default Menu;
