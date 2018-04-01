import Props from './visualization-components/privateProps';

const privateProps = new WeakMap();

const privateMethods = {
  setSelections() {
    const props = privateProps.get(this);
    props.container = d3.select('.quote');
    props.title = d3.select('.quote__text');
    props.name = d3.select('.quote__attribution');
  },
};

const publicProps = new Props(
  {
    target: privateProps,
    fields: [
      'selectedInterview',
    ],
  },
);
class TextOverlay {
  constructor() {
    privateProps.set(this, {});
  }
  init() {
    const { setSelections } = privateMethods;
    setSelections.call(this);
    this.update();
    return this;
  }
  update() {
    const {
      title,
      name,
      container,
      selectedInterview,
    } = privateProps.get(this);

    if (selectedInterview !== undefined) {
      title.text(`"${selectedInterview.quote}"`);
      name.text(`—${selectedInterview.fullName}`);
    }
    container.classed('quote--hidden', selectedInterview === undefined);
  }
}

Object.assign(TextOverlay.prototype, publicProps);

export default TextOverlay;
