import Props from './visualization-components/props';

const props = new Props([
  'selectedInterview',
  'selection',
  'view',
]);
class TextOverlay {
  constructor() {
    props.addTo(this);
  }
  draw() {
    this.update();
    return this;
  }
  update() {
    const {
      selection,
      view,
      selectedInterview,
    } = this.props();
    selection.selectAll('.quote').remove();
    if (view === 'interview') {
      const quoteBox = selection
        .append('div')
        .attr('class', 'quote');

      quoteBox
        .append('div')
        .attr('class', 'quote__text')
        .text(`"${selectedInterview.quote}"`);

      quoteBox
        .append('div')
        .attr('class', 'quote__attribution')
        .text(`—${selectedInterview.fullName}`);
    }
  }
}

export default TextOverlay;
