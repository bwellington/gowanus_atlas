const dataLayers = [
  {
    header: 'Hydrology',
    options: [
          ['watershed', 'Gowanus Canal Watershed'],
          ['cso', 'Combined Sewer Overflow Areas'],
          ['flood', 'Flood Zones'],
          ['sewer', 'Combined Sewer Streams'],
          ['historicWetland', 'Historical Wetlands and Streams'],
          ['slr', 'Projected Sea Level Rise'],
    ],
  },
  {
    header: 'Superfund',
    options: [
          ['cleanup', 'Cleanup Plan'],
          ['gas', 'Manufactured Gas Plant Sites'],
          ['coal', 'Extent of Coal Tar Contamination'],
    ],
  },
  {
    header: 'Infrastructure',
    options: [
          ['massTransit', 'Mass Transit'],
          ['roads', 'Roads'],
          ['bicyle', 'Bicycle Paths'],
          ['pedestrian', 'Pedestrian Paths'],
    ],
  },
  {
    header: 'Social Landscape',
    options: [
          ['schools', 'Schools'],
          ['institutions', 'Community Facilities'],
          ['demographics', 'Demographics'],
          ['recreation', 'Recreation Areas'],
          ['political', 'Political Boundaries'],
          ['community', 'Community Uploads'],
    ],
  },
  {
    header: 'Build Environment',
    options: [
          ['zoning', 'Zoning'],
          ['landUse', 'Land Use'],
          ['buildings', 'Buildings'],
          ['ownership', 'Tax Parcel Ownership'],
          ['permits', 'Active Permit Requests'],
    ],
  },
];

export default dataLayers;
