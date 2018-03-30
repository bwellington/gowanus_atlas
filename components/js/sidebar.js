import Props from './visualization-components/privateProps';

const privateProps = new WeakMap();

const privateMethods = {

};

const publicMethods = {
  init() {
    console.log('init sidebar');
    return this;
  },
  updateLayers() {

  },
  updateInterview() {

  },
};

const publicProps = new Props({
  target: privateProps,
  fields: [
    'container',
    'selectedInterview',
    'selectedLayers',
    'onLayerClick',
    'onCloseClick',
  ],
});

class Sidebar {
  constructor() {
    privateProps.set(this, {});
  }
}

Object.assign(Sidebar.prototype, publicMethods);

export default Sidebar;
