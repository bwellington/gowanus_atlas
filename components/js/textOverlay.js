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
    if (view.type === 'interview') {
      const { interview } = view;

      const quoteBox = selection
        .append('div')
        .attr('class', 'quote');

      quoteBox
        .append('div')
        .attr('class', 'quote__text')
        .text(`"${interview.quote}"`);

      quoteBox
        .append('div')
        .attr('class', 'quote__attribution')
        .text(`—${interview.fullName}`);
    }
  }
}

export default TextOverlay;
