const privateProps = new WeakMap();

const privateMethods = {
  drawContainer({ name }) {
    return d3.select('.legend__content')
    .append('div')
    .attr('class', `legend__${name} legend__block`);
  },
  drawTitle({
    container,
    title,
  }) {
    container
      .append('div')
      .attr('class', 'legend__layer-title')
      .text(title);
  },
  drawRow({
    data,
    container,
  }) {
    const {
      type,
      color,
      text,
    } = data;
    const row = container
      .append('div')
      .attr('class', 'legend__row');

    const height = 25;
    const width = 25;

    const svg = row.append('svg')
      .styles({
        height: `${height}px`,
        width: `${width}px`,
      });

    if (type === 'dot') {
      svg.append('circle')
        .attrs({
          cx: `${width / 2}`,
          cy: `${height / 2}`,
          fill: color,
          r: 3,
        });
    }

    const textContainer = row.append('div')
      .attr('class', 'legend__row-text')
      .text(text);
  },
};

class Legend {
  constructor(config) {
    privateProps.set(this, {
      name: null,
      title: null,
      content: null,
    });
    this.config(config);
  }
  config(config) {
    Object.assign(privateProps.get(this), config);
    return this;
  }
  draw() {
    const props = privateProps.get(this);
    const {
      name,
      content,
      title,
    } = props;
    const {
      drawContainer,
      drawTitle,
      drawRow,
    } = privateMethods;

    d3.select('.legend')
      .classed('legend--on', true);
    const container = drawContainer({ name });
    drawTitle({
      container,
      title,
    });
    content.forEach((data) => {
      drawRow({
        data,
        container,
      });
    });

    Object.assign(props, {
      container,
    });
  }
  remove() {
    const props = privateProps.get(this);
    const {
      container,
    } = props;
    container.remove();
    const blockCount = d3.selectAll('.legend__block').size();
    console.log('count', blockCount);
    d3.select('.legend')
      .classed('legend--on', blockCount > 0);
  }
}

export default Legend;
