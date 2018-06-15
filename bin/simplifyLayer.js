const mapshaper = require('mapshaper');

const args = {
  input: null,
  filterFields: null,
  output: null,
  simplify: null,
  clipOutput: null,
  clipLayer: 'build/data/watershed.geojson',
};

// pluto
// Object.assign(args, {
//   input: 'rawData/pluto/BKMapPluto.shp',
//   filterFields: 'ZoneDist1,AssessTot,LandUse',
//   output: 'build/data/BKMapPlutoClipped.topojson',
// });

// fema
// Object.assign(args, {
//   input: 'rawData/fema_flood/s_fld_haz_ar.shp',
//   simplify: 0.5,
//   output: 'build/data/femaClipped.geojson',
// });

// parks
// Object.assign(args, {
//   input: 'rawData/parks.geojson',
//   simplify: 0.5,
//   filterFields: 'landuse,park_name',
//   output: 'build/data/parksClipped.topojson',
// });

// sandy inundation
// Object.assign(args, {
//   input: 'rawData/sandyinundation.geojson',
//   simplify: 0.25,
//   output: 'build/data/sandyClipped.topojson',
// });

// hurricane zones
// Object.assign(args, {
//   input: 'rawData/hurricanezones.geojson',
//   simplify: 0.5,
//   output: 'build/data/hurricaneZonesClipped.topojson',
// });

// bike racks
// Object.assign(args, {
//   input: 'rawData/bike/city_racks_2013_06_28.shp',
//   output: 'build/data/bikeRacksClipped.geojson',
// });

// bike routes
// Object.assign(args, {
//   input: 'rawData/bike/nyc_bike_routes_20170707.shp',
//   output: 'build/data/bikeRoutesClipped.topojson',
//   simplify: 0.5,
//   filterFields: 'street,fromstreet,tostreet,lanecount',
// });

// subway stations
// Object.assign(args, {
//   input: 'rawData/subwaystations.geojson',
//   output: 'build/data/subwayStationsClipped.geojson',
// });

// subway lines
// Object.assign(args, {
//   input: 'rawData/subwaylines.geojson',
//   output: 'build/data/subwayLinesClipped.geojson',
// });

// bulk storage
Object.assign(args, {
  input: 'rawData/bulkstorage.geojson',
  output: 'build/data/bulkStorageClipped.geojson',
  filterFields: '"Tank Location,Tank Type"',
});

const {
  input,
  output,
  simplify,
  filterFields,
  clipLayer,
} = args;

const format = output.includes('topojson') ?
  'topojson' :
  'geojson';

// simplify layer, set CRS
mapshaper.runCommands(`
  -i ${input} 
  ${filterFields !== null ? `-filter-fields ${filterFields}` : ''} 
  ${simplify !== null ? `-simplify ${simplify}` : ''} 
  -proj wgs84 
  -clip ${clipLayer} 
  -o ${output} format=${format}`, (e) => {
  if (e) throw e;
  // clipSimplifiedLayer();
});
