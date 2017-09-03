import ChainableObject from './visualization-components/chainableObject';

class Menu extends ChainableObject {
  constructor() {
    super([
      'selection',
      'position',
      'interviews',
      'status',
    ]);
  }
  draw() {
    const { selection, interviews } = this.props();
    const container = selection.append('div')
      .attr('class', 'menu__container');
    const rows = container.selectAll('.menu__row')
      .data(interviews)
      .enter()
      .append('div')
      .attr('class', 'menu__row');

    rows.append('div')
      .text(d => d.fullName);

    rows.append('div')
      .text(d => d.description);
  }
}

export default Menu;
