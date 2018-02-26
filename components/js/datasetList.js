

export const mapDatasetList = [
  {
    name: 'slr',
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
    category: 'Hydrology',
    fullName: 'Canal Watershed',
    exclude: [],
    dataPath: 'data/watershedsketch.json',
  },
  {
    name: 'cso',
    category: 'Hydrology',
    fullName: 'Combined Sewer Overflow',
    exclude: [],
    dataPath: 'data/cso.topojson',
  },
  {
    name: 'cleanup',
    category: 'Environment',
    fullName: 'Cleanup Plan',
    exclude: [],
    dataPath: 'data/cleanup.geojson',
  },
  {
    name: 'galleries',
    category: 'Culture',
    fullName: 'Art Galleries',
    exclude: [],
    dataPath: 'data/art_galleries_clip.geojson',
  },
  {
    name: 'landuse',
    category: 'Built Environment',
    fullName: 'Land Use',
    exclude: ['manufacturingLandUse', 'zoning', 'assessedValue'],
    dataPath: 'data/pluto.topojson',
  },
  {
    name: 'manufacturingLandUse',
    fullName: 'Manufacturing Land Use',
    category: 'Built Environment',
    exclude: ['landuse', 'zoning', 'assessedValue'],
    dataPath: 'data/pluto.topojson',
  },
  {
    name: 'zoning',
    category: 'Built Environment',
    fullName: 'Zoning',
    exclude: ['manufacturingLandUse', 'landuse', 'assessedValue'],
    dataPath: 'data/pluto.topojson',
  },
  {
    name: 'plutoBounds',
    category: 'Built Environment',
    fullName: 'Study Area',
    exclude: [],
    dataPath: 'data/plutoBounds.topojson',
  },
  {
    name: 'assessedValue',
    category: 'Built Environment',
    fullName: 'Total Assessed Value',
    exclude: ['manufacturingLandUse', 'landuse', 'zoning'],
    dataPath: 'data/pluto.topojson',
  },
];

export default mapDatasetList;
