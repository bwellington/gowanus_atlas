const mapshaper = require('mapshaper');

mapshaper.runCommands('-i rawData/pluto/BKMapPluto.geojson -clip build/data/watershed.geojson -o build/data/BKMapPlutoClipped.topojson format=topojson', (ee) => {
  if (ee) throw ee;
});
