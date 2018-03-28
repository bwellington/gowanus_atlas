const Map = ({ bounds, container }) => {
  const map = L.map(container.attr('id'), {
    zoomControl: false,
    renderer: L.canvas(),
  }).fitBounds(bounds);

  // L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
  //   attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> &copy; <a href='http://cartodb.com/attributions'>CartoDB</a>",
  //   subdomains: 'abcd',
  //   maxZoom: 19,
  // }).addTo(map);
  L.tileLayer('https://api.mapbox.com/styles/v1/bwellington/citvibb7y005w2io6oa24vj7f/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYndlbGxpbmd0b24iLCJhIjoiY2loNTNjazlwMTA0ZHc5bTU3cmJ3N24zMyJ9.PRgQmgfSQma6GPYEtykZ8Q', {
    attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors",
  }).addTo(map);

  return map;
};

export default Map;
