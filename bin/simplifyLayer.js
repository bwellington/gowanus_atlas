const mapshaper = require('mapshaper');

// pluto
// const input = 'rawData/pluto/BKMapPluto.shp';
// const filterFields = 'ZoneDist1,AssessTot,LandUse';
// const output = 'rawData/pluto/BKMapPluto.geojson format=geojson';
// const simplify = null;

// fema
// const input = 'rawData/fema_flood/s_fld_haz_ar.shp';
// const output = 'rawData/simplified/fema.geojson';
// const simplify = 0.5;
// const filterFields = null;

// parks
const input = 'rawData/parks.geojson';
const output = 'rawData/simplified/parks.topojson';
const simplify = 0.5;
const filterFields = 'landuse,park_name';


const format = output.includes('topojson') ?
  'topojson' :
  'geojson';

mapshaper.runCommands(`
  -i ${input} 
  ${filterFields !== null ? `-filter-fields ${filterFields}` : ''} 
  ${simplify !== null ? `-simplify ${simplify}` : ''} 
  -proj wgs84 
  -o ${output} format=${format}`, (e) => {
  if (e) throw e;
});
