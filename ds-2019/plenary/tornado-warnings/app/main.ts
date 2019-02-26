import esri = __esri;

import EsriMap = require("esri/Map");
import MapView = require("esri/views/MapView");
import FeatureLayer = require("esri/layers/FeatureLayer");
import FeatureFilter = require("esri/views/layers/support/FeatureFilter");
import FeatureEffect = require("esri/views/layers/support/FeatureEffect");
import StatisticDefinition = require("esri/tasks/support/StatisticDefinition");
import { Geometry, Extent } from "esri/geometry";
import Graphic = require("esri/Graphic");
import { SimpleFillSymbol } from "esri/symbols";
import { SimpleRenderer } from "esri/renderers";
import { updateGrid } from "./heatmapChart";

import Expand = require("esri/widgets/Expand");
import { timesOfDay, seasons } from "./constants";

( async () => {

  const url = "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Tornado_Warnings_2002_through_2011/FeatureServer/0";

  const layer = new FeatureLayer({
    url,
    outFields: ["*"]
  });

  const countiesLayer = new FeatureLayer({
    title: "counties",
    portalItem: {
      id: "7566e0221e5646f99ea249a197116605"
    },
    opacity: 0,
    renderer: new SimpleRenderer({
      symbol: new SimpleFillSymbol({
        color: [ 0,0,0,1 ],
        outline: null
      })
    })
  });

  const map = new EsriMap({
    basemap: "gray-vector",
    layers: [ layer, countiesLayer ]
  });

  const view = new MapView({
    map: map,
    container: "viewDiv",
    center: [ -89.89219164308874, 38.32818747333555 ],
    zoom: 4,
    highlightOptions: {
      color: "#262626",
      haloOpacity: 1,
      fillOpacity: 0
    }
  });

  await view.when();
  const seasonsElement = document.getElementById("seasons-filter");
  seasonsElement.style.visibility = "visible";
  view.ui.add(new Expand({
    view,
    content: document.getElementById("chartDiv"),
    expandIconClass: "esri-icon-chart",
    group: "top-left"
  }), "top-left");
  const seasonsExpand = new Expand({
    view,
    content: seasonsElement,
    expandIconClass: "esri-icon-filter",
    group: "top-left"
  });
  view.ui.add(seasonsExpand, "top-left");

  const zoomBtn = document.getElementById("zoomBtn");
  view.ui.add(zoomBtn, "top-left");
  zoomBtn.addEventListener("click", toggleExtent);

  const layerView = await view.whenLayerView(layer) as esri.FeatureLayerView;
  const countiesLayerView = await view.whenLayerView(countiesLayer) as esri.FeatureLayerView;

  const layerStats = await queryLayerStatistics(layer);
  console.log(JSON.stringify(layerStats));

  updateGrid(layerStats, layerView);

  let mousemoveEnabled = true;
  
  seasonsElement.addEventListener("click", filterBySeason);

  function filterBySeason (event: any) {
    const selectedSeason = event.target.getAttribute("data-season");
    const seasonsNodes = document.querySelectorAll(`.season-item`);
    seasonsNodes.forEach( (node:HTMLDivElement) => {
      const season = node.innerText;
      if(season !== selectedSeason){
        if(node.classList.contains("visible-season")) {
          node.classList.remove("visible-season");
        }
      } else {
        if(!node.classList.contains("visible-season")) {
          node.classList.add("visible-season");
        }
      }
    });

    layerView.filter = new FeatureFilter({
      where: `Season = '${selectedSeason}'`
    });
  }

  seasonsExpand.watch("expanded", () => {
    const seasonsNodes = document.querySelectorAll(`.season-item`);
    if (!seasonsExpand.expanded){
      seasonsNodes.forEach( (node:HTMLDivElement) => {
        node.classList.add("visible-season");
      });
      layerView.filter = new FeatureFilter({
        where: `1=1`
      });
    }
  });

  console.log(view);
  let highlight = null;
  view.on("drag", ["Control"], async (event) => {
    event.stopPropagation();

    const hitResponse = await view.hitTest(event);
    const hitResults = hitResponse.results.filter( hit => hit.graphic.layer === countiesLayer );
    if(hitResults.length > 0){
      const graphic = hitResults[0].graphic;
      if (highlight) {
        highlight.remove();
        highlight = null;
      }
      highlight = countiesLayerView.highlight([graphic.attributes.FID]);
      const geometry = graphic && graphic.geometry;
      let queryOptions = {
        geometry,//: view.toMap(event),
        // distance: 50,
        // units: "miles",
        spatialRelationship: "intersects"
      };

      const filterOptions = new FeatureFilter(queryOptions);

      // layerView.filter = filterOptions;
      layerView.effect = new FeatureEffect({
        filter: filterOptions,
        // insideEffect: "saturate(25%)",
        outsideEffect: "grayscale(75%) opacity(60%)"
      });

      const stats = await queryTimeStatistics(layerView, queryOptions);
      updateGrid(stats);
    }
  });

  interface QueryTimeStatsParams {
    geometry?: esri.Geometry,
    distance?: number,
    units?: string
  }

  async function queryTimeStatistics ( layerView: esri.FeatureLayerView, params: QueryTimeStatsParams): Promise<ChartData[]>{
    const { geometry, distance, units } = params;

    const query = layerView.layer.createQuery();

    query.outStatistics = [
      new StatisticDefinition({
        onStatisticField: "1",
        outStatisticFieldName: "value",
        statisticType: "count"
      })
    ];
    query.groupByFieldsForStatistics = [ "Season + '-' + timeOfDay" ];
    query.geometry = geometry;
    query.distance = distance;
    query.units = units;
    query.returnQueryGeometry = true;

    const queryResponse = await layerView.queryFeatures(query);

    const responseChartData = queryResponse.features.map( feature => {
      const timeSpan = feature.attributes["EXPR_1"].split("-");
      const season = timeSpan[0];
      const timeOfDay = timeSpan[1];
      return {
        timeOfDay,
        season, 
        value: feature.attributes.value
      };
    });
    return createDataObjects(responseChartData);
  }

  async function queryLayerStatistics(layer: esri.FeatureLayer): Promise<ChartData[]> {
    const query = layer.createQuery();
    query.outStatistics = [
      new StatisticDefinition({
        onStatisticField: "1",
        outStatisticFieldName: "value",
        statisticType: "count"
      })
    ];
    query.groupByFieldsForStatistics = [ "Season + '-' + timeOfDay" ];

    const queryResponse = await layer.queryFeatures(query);

    const responseChartData = queryResponse.features.map( feature => {
      const timeSpan = feature.attributes["EXPR_1"].split("-");
      const season = timeSpan[0];
      const timeOfDay = timeSpan[1];
      return {
        timeOfDay,
        season, 
        value: feature.attributes.value
      };
    });
    return createDataObjects(responseChartData);
  }

  function createDataObjects(data: StatisticsResponse[]): ChartData[] {

    let formattedChartData: ChartData[] = [];

    timesOfDay.forEach( (timeOfDay, t) => {
      seasons.forEach( (season, s) => {

        const matches = data.filter( datum => {
          return datum.season === season && datum.timeOfDay === timeOfDay;
        });

        formattedChartData.push({
          col: t,
          row: s,
          value: matches.length > 0 ? matches[0].value : 0
        });

      });
    });

    return formattedChartData;
  }

  let extentIndex = 0;
  const extents = [
    view.extent.clone(),
    new Extent({
      "spatialReference": {
        "wkid": 3857
      },
      "xmin": -10868752.477228628,
      "ymin": 3300368.82862141,
      "xmax": -9154117.05873601,
      "ymax": 4158909.530320281
    })
  ]
  function toggleExtent () {
    extentIndex = extentIndex === 0 ? 1 : 0;
    view.goTo(extents[extentIndex]);
  }

})();
