const mapshaper = require('mapshaper');

const clipLayer = 'build/data/watershed.geojson';

// pluto
// const input = 'rawData/pluto/BKMapPluto.geojson';
// const output = 'build/data/BKMapPlutoClipped.topojson';

// fema
// const input = 'rawData/simplified/fema.geojson';
// const output = 'build/data/femaClipped.geojson';

//parks
const input = 'rawData/simplified/parks.topojson';
const output = 'build/data/parksClipped.topojson';

const format = output.includes('topojson') ?
  'topojson' :
  'geojson';
mapshaper
  .runCommands(`
    -i ${input}
    -clip ${clipLayer}
    -o ${output} format=${format}`, (ee) => {
      if (ee) throw ee;
    });
