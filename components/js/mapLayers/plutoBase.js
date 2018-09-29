import Tooltip from '../visualization-components/tooltip';
import datasetList from '../datasetList';

const getPlutoBase = ({ privateProps, privateMethods }) => ({
  privateBaseMethods: {
    draw() {
      const props = privateProps.get(this);
      const {
        leafletMap,
        data,
        tooltip,
        tooltipOffset,
      } = props;
      const { getTooltipText } = privateMethods;
      const opacity = 0.8;
      props.mapLayer = L.geoJSON(data, {
        style(feature) {
          return {
            color: feature.properties.color,
            fillOpacity: opacity,
            stroke: false,
          };
        },
        interactive: true,
        onEachFeature(feature, layer) {
          const text = getTooltipText.call(this, feature);
          layer.on('mousedown', () => {
            tooltip.remove();
          });

          layer.on('mouseover', (e) => {
            layer.setStyle({
              fillOpacity: 1,
            });
            const pos = [
              e.containerPoint.x + tooltipOffset.x,
              e.containerPoint.y + tooltipOffset.y,
            ];
            tooltip
              .position(pos)
              .text(text)
              .draw();
          });

          layer.on('mousemove', (e) => {
            const pos = [
              e.containerPoint.x + tooltipOffset.x,
              e.containerPoint.y + tooltipOffset.y,
            ];
            tooltip
              .position(pos)
              .update();
          });

          layer.on('mouseout', () => {
            layer.setStyle({
              fillOpacity: opacity,
            });

            tooltip.remove();
          });
        },
      });

      props.mapLayer.addTo(leafletMap);
    },
  },
  publicBaseMethods: {
    init() {
      const props = privateProps.get(this);
      const { name } = props;
      const dataInfo = datasetList.find(d => d.name === name);

      props.dataPath = dataInfo.dataPath;
      props.tooltip = new Tooltip().selection(d3.select('body'));

      return this;
    },
    draw() {
      const props = privateProps.get(this);
      const {
        dataPath,
        data,
        status,
      } = props;
      const {
        draw,
        cleanData,
        getLegend,
      } = privateMethods;

      if (status) return;

      if (data === undefined) {
        d3.json(dataPath, (loadedData) => {
          props.data = cleanData.call(this, loadedData);
          draw.call(this);
        });
      } else {
        draw.call(this);
      }
      if (getLegend !== undefined) {
        props.legend = getLegend();
        props.legend.draw();
      }
      props.status = true;
    },
    remove() {
      const props = privateProps.get(this);
      const { mapLayer, status, legend } = props;
      if (!status) return;

      props.status = false;
      mapLayer.remove();
      if (legend !== undefined) {
        legend.remove();
      }
    },
  },
});

export default getPlutoBase;
