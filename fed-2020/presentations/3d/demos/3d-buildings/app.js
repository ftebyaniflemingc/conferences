require([
  "esri/views/SceneView",
  "esri/WebScene",
  "esri/renderers/UniqueValueRenderer",
  "esri/symbols/MeshSymbol3D",
  "esri/symbols/FillSymbol3DLayer",
  "esri/widgets/Legend",
  "esri/layers/GraphicsLayer",
  "esri/widgets/Sketch/SketchViewModel",
  "esri/widgets/Slider",
  "esri/views/layers/support/FeatureFilter",
  "esri/geometry/geometryEngine",
  "esri/Graphic",
  "esri/widgets/DirectLineMeasurement3D"
], function(
  SceneView, WebScene, UniqueValueRenderer, MeshSymbol3D, FillSymbol3DLayer,
  Legend, GraphicsLayer, SketchViewModel, Slider, FeatureFilter,
  geometryEngine, Graphic, DirectLineMeasurement3D
) {

  var titleDiv = document.getElementById("titleDiv");
  var slidesDiv = document.getElementById("slidesDiv");
  var activeWidget;

  // When the user's mouse location leaves the slides div,
  // scroll the position back to the top so "Slides" always shows
  slidesDiv.addEventListener("mouseleave", function(){
    slidesDiv.scrollTop = 0;
  });

  /**
   * Creates the UI for working with the scene's slides
   *
   * @param {esri/webscene/Slide} slide - The slide to add to the UI.
   */
  function createSlideUI(slide) {
    var slideElement = document.createElement("div");
    slideElement.id = slide.id;
    slideElement.classList.add("slide");

    slidesDiv.appendChild(slideElement);

    var titleElement = document.createElement("div");
    titleElement.innerText = slide.title.text;
    titleElement.classList.add("title");

    slideElement.appendChild(titleElement);

    var imgElement = document.createElement("img");
    imgElement.src = slide.thumbnail.url;
    imgElement.title = slide.title.text;

    slideElement.appendChild(imgElement);

    // When the slide element is clicked, apply the
    // slide's settings to the view
    slideElement.addEventListener("click", function() {

      const slideElements = document.getElementsByClassName("slide");

      for(var i = 0; i < slideElements.length; i++){
        slideElements[i].classList.remove("active");
      }

      slideElement.classList.add("active");
      titleDiv.innerHTML = slide.title.text;
      slide.applyTo(view);
    });
  }

  /************************************************************
  * Creates a new WebScene instance. A WebScene must reference
  * a PortalItem ID that represents a WebScene saved to
  * arcgis.com or an on-premise portal.
  *
  * To load a WebScene from an on-premise portal, set the portal
  * url in esriConfig.portalUrl.
  ************************************************************/

  var scene = new WebScene({
    portalItem: {
      id: "bc5f5c47c8a54162aed9adc0283f4708"
    }
  });

  // Set the WebScene instance to the map property in a SceneView.
  var view = new SceneView({
    map: scene,
    container: "viewDiv",
    padding: {
      top: 40
    }
  });

  const measurementWidgetButton = document.getElementById("distanceButton");
  view.ui.add(measurementWidgetButton, "top-left");

  document
  .getElementById("distanceButton")
  .addEventListener("click", function() {
    setActiveWidget(null);
    if (!this.classList.contains("active")) {
      setActiveWidget("distance");
    } else {
      setActiveButton(null);
    }
  });

  function setActiveWidget(type) {
    switch (type) {
      case "distance":
        activeWidget = new DirectLineMeasurement3D({
          view: view
        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.newMeasurement();

        view.ui.add(activeWidget, "top-right");
        setActiveButton(document.getElementById("distanceButton"));
        break;
      case "area":
        activeWidget = new AreaMeasurement3D({
          view: view
        });

        // skip the initial 'new measurement' button
        activeWidget.viewModel.newMeasurement();

        view.ui.add(activeWidget, "top-right");
        setActiveButton(document.getElementById("areaButton"));
        break;
      case null:
        if (activeWidget) {
          view.ui.remove(activeWidget);
          activeWidget.destroy();
          activeWidget = null;
        }
        break;
    }
  }

  function setActiveButton(selectedButton) {
    // focus the view to activate keyboard shortcuts for sketching
    view.focus();
    var elements = document.getElementsByClassName("active");
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove("active");
    }
    if (selectedButton) {
      selectedButton.classList.add("active");
    }
  }

  var legend;

  view.when().then(function() {
    // when the scene and view resolve, display the scene's
    // title in the DOM

    console.log("webscene: ", scene);
    var title = scene.portalItem.title;
    titleDiv.innerHTML = title;

    // Add the scene's slides to the slides dive
    var slides = scene.presentation.slides;
    slides.forEach(createSlideUI);

    // Set up UI elements
    legend = new Legend({
      view: view
    });

    view.ui.add([{
      component: legend,
      position: "bottom-left"
    }, {
      component: "sidebarDiv",
      position: "top-right",
      index: 0
    }, {
      component: "slidesDiv",
      position: "top-right",
      index: 1
    }, {
      component: "sidebarDiv",
      position: "bottom-right",
      index: 0
    }])

    // Set up event handlers for filtering and visualization
    document.getElementById("type-select").addEventListener("change", selectUsageType);
    document.getElementById("market-check").addEventListener("change", viewDaysOnMarket);
  });

  // add a GraphicsLayer for the sketches and the buffer
  let sketchLayer = new GraphicsLayer();
  let bufferLayer = new GraphicsLayer();
  view.map.addMany([bufferLayer, sketchLayer]);

  // create the layerView's to add the filter
  let lv1 = null;
  let lv2 = null;
  view.map.load().then(function() {
    // loop through webmap's operational layers
    view.map.allLayers.forEach(function(layer, index) {
      view
        .whenLayerView(layer)
        .then(function(layerView) {
          if (layer.title === "NYC_NoData_EnergyScore") {
            lv1 = layerView;
          }
          if(layer.title === "NYC Buildings"){
            lv2 = layerView;
          }
        })
        .catch(console.error);
    });
  });

  const bufferNumSlider = new Slider({
    container: "bufferNum",
    min: 0,
    max: 1000,
    steps: 1,
    labelsVisible: true,
    precision: 0,
    labelFormatFunction: function(value, type) {
      return value.toString() + "m";
    },
    values: [0]
  });

  let bufferSize = 0;
  bufferNumSlider.on(
    ["thumb-change", "thumb-drag"],
    bufferVariablesChanged
  );
  function bufferVariablesChanged(event) {
    bufferSize = event.value;
    updateFilter();
  }

  // use SketchViewModel to draw polygons that are used as a filter
  let sketchGeometry = null;
  const sketchViewModel = new SketchViewModel({
    layer: sketchLayer,
    view: view,
    pointSymbol: {
      type: "simple-marker",
      style: "circle",
      size: 10,
      color: [255, 255, 255, 0.8],
      outline: {
        color: [211, 132, 80, 0.7],
        size: 10
      }
    },
    polylineSymbol: {
      type: "simple-line",
      color: [211, 132, 80, 0.7],
      width: 6
    },
    polygonSymbol: {
      type: "polygon-3d",
      symbolLayers: [
        {
          type: "fill",
          material: {
            color: [255, 255, 255, 0]
          },
          outline: {
            color: [211, 132, 80, 0.7],
            size: "10px"
          }
        }
      ]
    }
  });

  sketchViewModel.on(["create"], function(event) {
    // update the filter every time the user finishes drawing the filtergeometry
    if (event.state == "complete") {
      sketchGeometry = event.graphic.geometry;
      updateFilter();
    }
  });

  sketchViewModel.on(["update"], function(event) {
    const eventInfo = event.toolEventInfo;
    // update the filter every time the user moves the filtergeometry
    if (eventInfo && eventInfo.type.includes("move")) {
      if (eventInfo.type === "move-stop") {
        sketchGeometry = event.graphics[0].geometry;
        updateFilter();
      }
    }
    // update the filter every time the user changes the vertices of the filtergeometry
    if (eventInfo && eventInfo.type.includes("reshape")) {
      if (eventInfo.type === "reshape-stop") {
        sketchGeometry = event.graphics[0].geometry;
        updateFilter();
      }
    }
  });

  // draw geometry buttons - use the selected geometry to sktech
  document.getElementById(
    "point-geometry-button"
  ).onclick = geometryButtonsClickHandler;

  function geometryButtonsClickHandler(event) {
    const geometryType = event.target.value;
    clearFilter();
    sketchViewModel.create(geometryType);
  }

  // get the selected spatialRelationship
  let selectedFilter = "disjoint";

  // remove the filter
  document
    .getElementById("clearFilter")
    .addEventListener("click", function() {
      clearFilter();
    });

  function clearFilter() {
    view.map.ground.opacity = 1;
    sketchGeometry = null;
    filterGeometry = null;
    sketchLayer.removeAll();
    bufferLayer.removeAll();
    lv1.filter = null;
    lv2.filter = null;
  }

  // set the geometry filter on the visible FeatureLayerView
  function updateFilter() {
    view.map.ground.opacity = 0.5;
    updateFilterGeometry();
    featureFilter = {
      // autocasts to FeatureFilter
      geometry: filterGeometry,
      spatialRelationship: selectedFilter
    };

    lv1.filter = featureFilter;
    lv2.filter = featureFilter;
  }

  // update the filter geometry depending on bufferSize
  let filterGeometry = null;
  function updateFilterGeometry() {
    // add a polygon graphic for the bufferSize
    if (sketchGeometry) {
      if (bufferSize > 0) {
        var bufferGeometry = geometryEngine.geodesicBuffer(
          sketchGeometry,
          bufferSize,
          "meters"
        );
        if (bufferLayer.graphics.length === 0) {
          bufferLayer.add(
            new Graphic({
              geometry: bufferGeometry,
              symbol: sketchViewModel.polygonSymbol
            })
          );
        } else {
          bufferLayer.graphics.getItemAt(0).geometry = bufferGeometry;
        }
        filterGeometry = bufferGeometry;
      } else {
        bufferLayer.removeAll();
        filterGeometry = sketchGeometry;
      }
    }
  }

  document.getElementById("sidebarDiv").style.display = "block";
});