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

// make this an object instead and add methods to it????? Yes do that
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
];

export default mapDatasetList;
