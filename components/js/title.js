import Props from './visualization-components/props';

const props = new Props([
  'selection',
  'title',
  'subtitle',
  'name',
])
  .setDefaultValues({ name: 'title' });


class Title {
  constructor() {
    props.addTo(this);
  }
  draw() {
    const { selection, name, title, subtitle } = this.props();

    const titleContainer = selection.append('div')
      .attr('class', `${name}`);

    titleContainer.append('div')
      .attr('class', `${name}__main`)
      .text(title);

    titleContainer.append('div')
      .attr('class', `${name}__sub`)
      .text(subtitle);
    return this;
  }
}

export default Title;
