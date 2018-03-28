const fs = require('fs');
const async = require('async');
const contains = require('@turf/boolean-contains');
const overlap = require('@turf/boolean-overlap');
const {
  polygon,
  featureCollection,
} = require('@turf/helpers');
const mapshaper = require('mapshaper');

const privateProps = new WeakMap();

const inputName = 'BKMapPluto.geojson';
const boundaryName = 'watershed.geojson';
const outputName = 'BKMapPlutoWatershed.topojson';

const inputPath = 'rawData/pluto/';
const boundaryPath = 'build/data/';

const extract = {
  init() {
    this.setPrivateProps();
    this.loadData(() => {
      this.processData();
      this.writeFile();
    });
  },
  setPrivateProps() {
    privateProps.set(this, {});
  },
  loadData(callback) {
    const props = privateProps.get(this);
    async.map([
      `${inputPath}/${inputName}`,
      `${boundaryPath}/${boundaryName}`,
    ], fs.readFile, (err, results) => {
      if (err) throw err;
      props.input = JSON.parse(results[0]);
      props.boundary = JSON.parse(results[1]).features[0];
      callback();
    });
  },
  processData() {
    const props = privateProps.get(this);
    const {
      input,
      boundary,
    } = props;

    // const testFeature = (boundaryFeature, feature) =>
    // contains.default(boundaryFeature, feature) ||
    //   overlap.default(boundaryFeature, feature);
    const testFeature = (boundaryFeature, feature) => contains.default(boundaryFeature, feature);

    const filteredFeatures = input.features.filter((d) => {
      if (d.geometry.type === 'MultiPolygon') {
        return d.geometry.coordinates.map(dd => testFeature(boundary, polygon(dd)))
          .includes(true);
      }
      return testFeature(boundary, d);
    });

    props.filteredInput = featureCollection(filteredFeatures);
  },
  writeFile() {
    const { filteredInput } = privateProps.get(this);
    const input = {};

    input[inputName] = filteredInput;

    mapshaper.applyCommands(
      `-i ${inputName} -o ${outputName} format=topojson`,
      input,
      (err, output) => {
        if (err) throw err;
        console.log(Object.keys(output));
        fs.writeFile(outputName, output[outputName], 'utf8', (err2) => {
          if (err2) throw err2;
          console.log(`Wrote file ${outputName}`);
        });
      },
    );
  },
};

extract.init();
