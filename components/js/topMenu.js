import Props from './visualization-components/privateProps';

const privateProps = new WeakMap();

const privateMethods = {
  initPopups() {
    const {
      initStoriesPopup,
      initAllDataPopup,
    } = privateMethods;
    initStoriesPopup.call(this);
    initAllDataPopup.call(this);
  },
  initStoriesPopup() {
    const props = privateProps.get(this);
    const {
      interviews,
      interviewCategories,
      onInterviewClick,
    } = props;

    const { setInterviewColors } = privateMethods;

    $('.top-menu__item--stories')
      .popup({
        html: `
          <div class="top-menu__content top-menu__content--stories">
          </div>
        `,
        hoverable: true,
        variation: 'basic',
        lastResort: 'bottom left',
        onCreate: () => {
          props.storiesContainer = d3.select('.top-menu__content--stories');

          props.storiesContainer.selectAll('.top-menu__interview-category')
            .data(interviewCategories)
            .enter()
            .append('div')
            .attr('class', 'top-menu__interview-category')
            .each(function addInterviews(category) {
              const categoryBlock = d3.select(this);
              categoryBlock
                .append('div')
                .attr('class', 'top-menu__category-header top-menu__header')
                .text(category)
                .append('hr')
                .attr('class', 'top-menu__category-hr');

              const interviewsRow = categoryBlock.append('div')
                .attr('class', 'top-menu__category-row');

              const interviewBlocks = interviewsRow
                .selectAll('.top-menu__interview')
                .data(interviews.filter(d => d.category === category))
                .enter()
                .append('div')
                .attr('class', 'top-menu__interview');

              interviewBlocks.append('div')
                .attr('class', 'top-menu__headshot-container')
                .append('img')
                .attrs({
                  src: d => d.imagePath,
                  class: 'top-menu__interview-headshot',
                });

              const infoContainers = interviewBlocks.append('div')
                .attr('class', 'top-menu__person-info');

              infoContainers.append('div')
                .attr('class', 'top-menu__person-name')
                .text(d => d.fullName);

              infoContainers.append('div')
                .attr('class', 'top-menu__person-title')
                .text(d => d.title);

              // interviewBlocks.classed()
              interviewBlocks.on('click', onInterviewClick);
            });
          props.interviewBlocks = props.storiesContainer.selectAll('.top-menu__interview');

          setInterviewColors.call(this);
        },
      });
  },
  setInterviewColors() {
    const {
      selectedInterview,
      interviewBlocks,
    } = privateProps.get(this);

    if (interviewBlocks === undefined) return;
    if (selectedInterview === undefined) {
      interviewBlocks
      .classed('top-menu__interview--active', false);
    } else {
      interviewBlocks
      .classed('top-menu__interview--active', d => d.name === selectedInterview.name);
    }
  },
  setLayerColors() {
    const {
      menuLayers,
      selectedLayers,
      mapLayers,
    } = privateProps.get(this);

    if (menuLayers === undefined || selectedLayers === undefined) return;

    menuLayers.classed('top-menu__map-layer--active', d => selectedLayers.includes(d.name));
    menuLayers.classed('top-menu__map-layer--disabled', (d) => {
      if (selectedLayers === undefined) return false;
      const selectedMapLayers = selectedLayers.map(dd => mapLayers.find(ddd => ddd.name === dd));
      return selectedMapLayers
        .filter(dd => dd.exclude.includes(d.name))
        .length > 0;
    });
  },
  drawLayerButtons({ layers, buttonContainer }) {
    const props = privateProps.get(this);
    const {
      onLayerClick,
    } = props;

    buttonContainer
      .selectAll('.top-menu__map-layer')
      .data(layers)
      .enter()
      .append('div')
      .on('click', (d) => {
        onLayerClick(d.name);
      })
      .attr('class', 'top-menu__map-layer')
      .text(d => d.fullName);
  },
  setClearButtonVisibility() {
    const { clearButton, selectedLayers } = privateProps.get(this);
    if (clearButton === undefined) return;
    clearButton.classed('top-menu__clear-button--hidden', selectedLayers.length === 0);
  },
  initAllDataPopup() {
    const props = privateProps.get(this);
    const {
      mapLayers,
      onClearClick,
    } = props;

    const {
      drawLayerButtons,
      setLayerColors,
      setClearButtonVisibility,
    } = privateMethods;
    const boundDrawLayerButtons = drawLayerButtons.bind(this);

    const categories = [...new Set(mapLayers.map(d => d.category))];

    $('.top-menu__item--all')
      .popup({
        html: `
          <div class="top-menu__content top-menu__content--all">
          </div>
        `,
        hoverable: true,
        variation: 'basic',
        lastResort: 'bottom left',
        onCreate: () => {
          props.mapLayersContainer = d3.select('.top-menu__content--all');
          props.clearButton = props.mapLayersContainer
            .append('div')
            .attr('class', 'top-menu__clear-button-row')
            .append('div')
            .attr('class', 'top-menu__clear-button top-menu__clear-button--hidden')
            .text('Clear all layers')
            .on('click', onClearClick);

          const menuRows = props.mapLayersContainer
            .selectAll('.top-menu__button-row')
            .data(categories)
            .enter()
            .append('div')
            .attr('class', 'top-menu__button-row');

          menuRows
            .append('div')
            .attr('class', 'top-menu__row-title')
            .text(d => d);

          menuRows
            .append('div')
            .attr('class', 'top-menu__button-container')
            .each(function addButtons(d) {
              boundDrawLayerButtons({
                layers: mapLayers.filter(dd => dd.category === d),
                buttonContainer: d3.select(this),
              });
            });

          props.menuLayers = props.mapLayersContainer
            .selectAll('.top-menu__map-layer');

          setClearButtonVisibility.call(this);
          setLayerColors.call(this);
        },
      });
  },
  initModal() {
    const { container } = privateProps.get(this);
    const { openModal, closeModal } = privateMethods;
    container.select('.top-menu__item--about')
      .on('click', openModal.bind(this));
    d3.select('.about__explore-button')
      .on('click', closeModal.bind(this));
  },
  openModal() {
    $('.ui.modal')
      .modal('show');
  },
  closeModal() {
    $('.ui.modal')
      .modal('hide');
  },
  setInterviewCategories() {
    const props = privateProps.get(this);
    const { interviews } = props;
    props.interviewCategories = [...new Set(interviews.map(d => d.category))];
  },
};

const publicMethods = {
  init() {
    const {
      initPopups,
      initModal,
      setInterviewCategories,
      // openModal,
    } = privateMethods;
    setInterviewCategories.call(this);
    initPopups.call(this);
    initModal.call(this);

    // openModal.call(this);

    return this;
  },
  updateInterview() {
    const { setInterviewColors } = privateMethods;
    setInterviewColors.call(this);
  },
  updateLayers() {
    const {
      setLayerColors,
      setClearButtonVisibility,
    } = privateMethods;
    setLayerColors.call(this);
    setClearButtonVisibility.call(this);
  },
};

const publicProps = new Props({
  target: privateProps,
  fields: [
    'container',
    'interviews',
    'mapLayers',
    'onClearClick',
    'onInterviewClick',
    'onLayerClick',
    'selectedInterview',
    'selectedLayers',
  ],
});

class TopMenu {
  constructor() {
    privateProps.set(this, {
      // get all unique categories from interview list
      // interviewCategories: [
      //   'Built Environment',
      //   'Community',
      //   'Culture',
      //   'Environment',
      //   'Equity',
      //   'Hydrology',
      //   'Social Landscape',
      //   // 'Industry and Infrastructure',
      //   'Infrastructure',
      // ],
    });
  }
}

Object.assign(TopMenu.prototype, publicMethods, publicProps);

export default TopMenu;
