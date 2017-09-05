import ChainableObject from './visualization-components/chainableObject';

class Title extends ChainableObject {
  constructor() {
    super([
      'selection',
      'title',
      'subtitle',
    ]);
  }
  draw() {
    const { selection, title, subtitle } = this.props();
    const titleContainer = selection.append('div')
      .attr('class', 'title');

    titleContainer.append('div')
      .attr('class', 'title__main')
      .text(title);

    titleContainer.append('div')
      .attr('class', 'title__sub')
      .text(subtitle);
  }
}

export default Title;
