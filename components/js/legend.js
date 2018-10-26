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
    gradient,
  }) {
    const {
      type,
      color,
      text,
    } = data;
    const row = container
      .append('div')
      .attr('class', `legend__row ${gradient ? 'legend__row--gradient' : ''}`);

    const height = gradient ? 5 : 20;
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
    } else if (type === 'rect') {
      svg.append('rect')
        .attrs({
          x: 0,
          y: 0,
          width,
          height,
          fill: color,
        });
    }

    row.append('div')
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
      gradient: false,
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
      gradient,
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
        gradient,
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

    d3.select('.legend')
      .classed('legend--on', blockCount > 0);
  }
}

export default Legend;
