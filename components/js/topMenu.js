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
                .attr('class', 'top-menu__category-header menu__header')
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

    if (selectedInterview === undefined || interviewBlocks === undefined) return;

    interviewBlocks
      .classed('top-menu__interview--active', d => d.name === selectedInterview.name);
  },
  setLayerColors() {
    const { menuLayers, selectedLayers } = privateProps.get(this);

    if (menuLayers === undefined || selectedLayers === undefined) return;

    menuLayers.classed('top-menu__map-layer--active', d => selectedLayers.includes(d.name));
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
  initAllDataPopup() {
    const props = privateProps.get(this);
    const {
      mapLayers,
    } = props;

    const {
      drawLayerButtons,
      setLayerColors,
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
        onCreate: () => {
          props.mapLayersContainer = d3.select('.top-menu__content--all');
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

          setLayerColors.call(this);
        },
      });
  },
};

const publicMethods = {
  init() {
    const {
      initPopups,
    } = privateMethods;
    initPopups.call(this);

    return this;
  },
  updateInterview() {
    const { setInterviewColors } = privateMethods;
    setInterviewColors.call(this);
  },
  updateLayers() {
    const { setLayerColors } = privateMethods;
    setLayerColors.call(this);
  },
};

const publicProps = new Props({
  target: privateProps,
  fields: [
    'container',
    'interviews',
    'mapLayers',
    'onInterviewClick',
    'onLayerClick',
    'selectedInterview',
    'selectedLayers',
  ],
});

class TopMenu {
  constructor() {
    privateProps.set(this, {
      interviewCategories: [
        'Social Landscape',
        'Industry and Infrastructure',
        'Community',
        'Equity',
      ],
    });
  }
}

Object.assign(TopMenu.prototype, publicMethods, publicProps);

export default TopMenu;
