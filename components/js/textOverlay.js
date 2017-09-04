import ChainableObject from './visualization-components/chainableObject';

class TextOverlay extends ChainableObject {
  constructor() {
    super([
      'selection',
      'view',
    ]);
  }
  draw() {
    this.update();
    return this;
  }
  update() {
    const { selection, view } = this.props();
    selection.selectAll('.quote').remove();
    selection
      .append('div')
      .attr('class', 'quote')
      .text('"QUOTE FROM INTERVIEW THAT RELATES TO MAP"');
  }
}

export default TextOverlay;
