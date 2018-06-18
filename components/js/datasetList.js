

export const mapDatasetList = [
  {
    name: 'slr',
    render: 'd3',
    category: 'Hydrology',
    fullName: 'Projected Sea Level Rise',
    exclude: [],
    dataPath: [
      'data/75in_clip_simplified.topojson',
      'data/58in_clip_simplified.topojson',
      'data/30in_clip_simplified.topojson',
      'data/10in_clip_simplified.topojson',
    ],
  },
  {
    name: 'watershed',
    render: 'd3',
    category: 'Hydrology',
    fullName: 'Canal Watershed',
    exclude: [],
    dataPath: 'data/watershedsketch.topojson',
  },
  {
    name: 'cso',
    render: 'd3',
    category: 'Hydrology',
    fullName: 'Combined Sewer Overflow',
    exclude: [],
    dataPath: {
      csoOutfall: 'data/cso_outfall.geojson',
      csoArea: 'data/cso.topojson',
    },
  },
  {
    name: 'cleanup',
    render: 'd3',
    category: 'Environment',
    fullName: 'Cleanup Plan',
    exclude: [],
    dataPath: 'data/cleanup.geojson',
  },
  {
    name: 'galleries',
    render: 'd3',
    category: 'Culture',
    fullName: 'Art Galleries',
    exclude: [],
    dataPath: 'data/art_galleries_clip.geojson',
  },
  {
    name: 'bike',
    render: 'd3',
    category: 'Infrastructure',
    fullName: 'Bicycle Infrastructure',
    exclude: [],
    dataPath: {
      bikeRoutes: 'data/bikeRoutesClipped.topojson',
      bikeRacks: 'data/bikeRacksClipped.geojson',
    },
  },
  {
    name: 'landuse',
    render: 'leaflet',
    category: 'Built Environment',
    fullName: 'Land Use',
    exclude: ['manufacturingLandUse', 'zoning', 'assessedValue'],
    dataPath: 'data/BKMapPlutoClipped.topojson',
  },
  {
    name: 'manufacturingLandUse',
    render: 'leaflet',
    fullName: 'Manufacturing Land Use',
    category: 'Built Environment',
    exclude: ['landuse', 'zoning', 'assessedValue'],
    dataPath: 'data/BKMapPlutoClipped.topojson',
  },
  {
    name: 'zoning',
    render: 'leaflet',
    category: 'Built Environment',
    fullName: 'Zoning',
    exclude: ['manufacturingLandUse', 'landuse', 'assessedValue'],
    dataPath: 'data/BKMapPlutoClipped.topojson',
  },
  // need to rename this
  {
    name: 'plutoBounds',
    render: 'd3',
    category: 'Built Environment',
    fullName: 'Approximate Rezoning Area',
    exclude: [],
    dataPath: 'data/plutoBounds.topojson',
  },
  {
    name: 'assessedValue',
    render: 'leaflet',
    category: 'Built Environment',
    fullName: 'Total Assessed Value',
    exclude: ['manufacturingLandUse', 'landuse', 'zoning'],
    dataPath: 'data/BKMapPlutoClipped.topojson',
  },
];

export default mapDatasetList;
