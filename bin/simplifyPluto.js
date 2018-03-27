const mapshaper = require('mapshaper');

mapshaper.runCommands('-i rawData/pluto/BKMapPluto.shp -filter-fields ZoneDist1,AssessTot,LandUse -proj wgs84 -o rawData/pluto/BKMapPluto.geojson format=geojson', (e) => {
  if (e) throw e;
});
