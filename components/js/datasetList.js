export class Dataset {
  constructor(name, nameDescriptive, dataPath) {
    this.name = name;
    this.nameDescriptive = nameDescriptive;
    this.dataPath = dataPath;
  }
  static getDatasetNames(datasetList) {
    return datasetList.map(d => d.name);
  }
  static getDatasetByName(datasetList, name) {
    return datasetList.filter(d => d.name === name)[0];
  }
}


export const mapDatasetList = [
  new Dataset(
    'slr',
    'Projected Sea Level Rise',
    [
      'data/75in_clip_simplified.topojson',
      'data/58in_clip_simplified.topojson',
      'data/30in_clip_simplified.topojson',
      'data/10in_clip_simplified.topojson',
    ],
  ),
  new Dataset(
    'watershed',
    'Gowanus Canal Watershed',
    'data/watershedsketch.json',
  ),
  new Dataset(
    'cleanup',
    'Cleanup Plan',
    'data/cleanup.geojson',
  ),
  new Dataset(
    'galleries',
    'Art Galleries',
    'data/art_galleries.geojson',
  ),
  new Dataset(
    'landuse',
    'Land Use',
    'data/pluto_zoning_small.geojson',
  ),
];

export default mapDatasetList;
