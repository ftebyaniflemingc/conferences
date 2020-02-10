<!-- .slide: data-background="../../common/images/bg-1.png" -->
<!-- .slide: class="title" -->

<h2 style="text-align: left; font-size: 50px; padding-top: 150px;">ArcGIS API for JavaScript Programming Patterns</h1>
<h2 style="text-align: left; font-size: 50px;">and API Fundamentals</h2>
<p style="text-align: left; font-size: 30px;">Kristian Ekenes (<a href="https://twitter.com/kekenes" target="_blank">@kekenes</a>)</p>
<!-- <p style="text-align: left; font-size: 30px;">slides: <a href="https://git.io/JvnpF" target="_blank">https://git.io/JvnpF</a> (not live yet!)</p> -->

<!--
In this session, you'll learn the basics of the ArcGIS API 4.x for JavaScript, including the fundamentals of watching for property changes, autocasting, working with collections, and lazy-loading data in your applications. You'll learn more details about maps, webmaps, layers, 2D and 3D views, UI, and widgets. This is a key session for developers new to the 4.x version of the API.
-->

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->

## What you get with the JS API

- Simplified and consistent web mapping API
- Wraps and consumes ArcGIS Services, but...
- You can use other data types as well
  - GeoJSON, CSV, OGC, [Feature Collections](https://developers.arcgis.com/javascript/latest/sample-code/layers-featurelayer-collection/index.html)
- Write apps in ES6 or TypeScript
- Modern browser support (IE11+)
- [Supported in 30+ locales](http://www.arcgis.com/apps/3DInsetMap/index.html?locale=ja)

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->

## What you get with the JS API

- Technical support
- GeoNet Community
- Excellent documentation and samples
  - Links from the sandbox
- Blogs, videos, and other resources

----
<!-- .slide: data-background="../../common/images/bg-3.png" -->

## Fundamentals

...and some patterns

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Map and View

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Map and View

```js
const map = new Map({
  basemap: "topo"
});

// 2d
const mView = new MapView({
  map: map,
  container: "viewDiv"
});
//3d
const sView = new SceneView({
  map: map,
  container: "viewDiv"
});
```

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Basemaps and Ground

- Convenience Strings

```js
const map = new Map({
  /*
   streets, satellite, hybrid, terrain, topo, gray,
   dark-gray, oceans, national-geographic, osm,
   dark-gray-vector, gray-vector, streets-vector, topo-vector,
   streets-night-vector, streets-relief-vector, streets-navigation-vector
   */
  basemap: "streets"

  /*
   world-elevation
   */
  ground: "world-elevation"
});
```

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Layer and LayerView

20+ layer types!

- FeatureLayer
- MapImageLayer
- CSVLayer
- GeoJSONLayer
- WMSLayer, WMTSLayer
- TileLayer
- ...

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## FeatureLayer

```js
const layer = new FeatureLayer({
  url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Enriched_United_States_Tract_Boundaries_2018/FeatureServer"
});

const map = new Map({
  basemap: "topo",
  layers: [ layer ]
});

const mView = new MapView({
  map: map,
  container: "viewDiv"
});
```

[Example](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=layers-featurelayer)

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Popup Templates

```js
layer.popupTemplate = {
  title: "{NAME} County",
  content: "{POP2020} people live here.",
  fieldInfos: [{
    fieldName: "POP2020",
    format: {
      places: 0,
      digitSeparator: true
    }
  }]
}
```

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Popup Templates

 - [Define fields, charts, custom html content](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=popup-multipleelements)
 - [Using a function](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=popuptemplate-promise)
 - Promises
 - [Arcade](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=popuptemplate-arcade-groupby)

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Renderers

```js
layer.renderer = {
  type: "simple",
  visualVariables: [{
    type: "size",
    field: "POP2020",
    minSize: 6,
    maxSize: 50,
    minDataValue: 10000,
    maxDataValue: 1000000
  }]
};
```

Go to the Visualization with the ArcGIS API for JavaScript session later this week!

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->

## LayerView

- Renders the Layer
- Provides access to features on the client
- When is it done?

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## LayerView

<iframe height='500' scrolling='no' title='LayerView - Ready' src='//codepen.io/odoe/embed/preview/YvRJgj/?height=500&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/YvRJgj/'>LayerView - Ready</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Basemaps and Ground

```js
const map = new Map({
  basemap: {
    // Layers drawn at the bottom
    baseLayers: [
      new TileLayer({ url: baselayer })
    ],
    // Layers drawn on top
    referenceLayers: [
      new TileLayer({ url: refUrl })
    ],
  },
  ground: {
    layers: [
      new ElevationLayer({ url: elevationUrl })
    ]
  }
});
```

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Basemap and Ground

<iframe height='500' scrolling='no' title='VT Basemaps' src='//codepen.io/odoe/embed/preview/rpQOEM/?height=300&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/rpQOEM/'>VT Basemaps</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Collections

- [`esri/core/Collection`](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-Collection.html)

<iframe height="400" style="width: 100%;" scrolling="no" title="Collection" src="//codepen.io/odoe/embed/preview/MQWLwO/?height=300&theme-id=31222&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/odoe/pen/MQWLwO/'>Collection</a> by Rene Rubalcava
  (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
### Working with properties

Getting and setting

```ts
layer.opacity = 0.5;
layer.title = "My test layer";

// setting multiple values
layer.set({
  opacity: 0.5,
  title: "My test layer"
});

// accessing the value of a deep property
console.log(view.map.basemap.title);
view.set("map.basemap.title", "new title");
```

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
### Working with properties

Watching (no events!)

```ts
mapView.watch("scale", (newValue, oldValue, property, target) => {
  console.log(`scale changed: ${newValue}`);
});


mapView.watch("map.basemap.title", (newValue, oldValue, property, target) => {
  console.log(`new basemap title: ${newValue}`);
});


mapView.watch("ready, stationary", (newValue, oldValue, property, target) => {
  console.log(`property ${property}: ${newValue}`);
});

watchUtils.whenTrue(view, "stationary", () => {
  console.log("view is stationary");
})
```

[watchUtils](https://developers.arcgis.com/javascript/latest/api-reference/esri-core-watchUtils.html)

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
### Working with properties

Autocasting and single constructor

```js
  // 4.x
  layer.renderer = {
    type: "simple",
    symbol: {
      type: "simple-marker",
      style: "square",
      color: "red",
      size: 10,
      outline: {
        color: "rgba(255, 255, 255, 0.5)"
        width: 4
      }
    }
  };

  // 3.x
  layer.setRenderer(
    new SimpleRenderer(
    new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10,
    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
    new Color([255,0,0]), 4),
    new Color([255,255,255,0.25])));
```

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Promises

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Promises

- All asynchronous methods return a promise
- No more [events](https://developers.arcgis.com/javascript/jsapi/querytask-amd.html#events)
- The basic pattern looks like this:

```js
layer.queryFeatures(query).then(handleResult).catch(handleError);
```

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Promises with async/await

```js
const doQuery = async (query) => {
  const results = await layer.queryFeatures(query);
  const transformedResults = results.map(transformData);
  return transformedResults;
}
```

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Promises

- Load resources
- Asychronously initialized `Layer`, `WebMap`, `WebScene`, `View`

```js
const map = new Map({...})

const view = new SceneView({
  map: map,
  //...
});

view.when().then(() => {
  // the view is ready to go
});
```

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Promises

```js
view.when().then(() => {
  return view.whenLayerView(map.findLayerById("awesomeLayer"));
})
.then(layerView => {
  return watchUtils.whenFalseOnce(layerView, "updating");
})
.then(result => {
  const layerView = result.target;
  return layerView.queryFeatures();
})
.then(doSomethingWithFeatures)
.catch(errorHandler);
```

[API sample](https://developers.arcgis.com/javascript/latest/sample-code/chaining-promises/index.html)

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## async/await

```js
const init = async (doSomethingWithFeatures) => {
  await view.when();
  const layerView = await view.whenLayerView(map.findLayerById("awesomeLayer"));
  const { target as layerView } = await watchUtils.whenFalseOnce(layerView, "updating");
  const features = await layerView.queryFeatures();
  doSomethingWithFeatures(features);
};

try {
  init();
}
catch(error) {
  errorHandler(error);
}

```

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## createQuery

- When you can do `layer.createQuery()`
  - `query` object will already have the layers filters and layer definitions
  - more consistent
- Use `new Query()` when you don't want predefined filters to be applied

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## createQuery

<iframe height='500' scrolling='no' title='createQuery' src='//codepen.io/odoe/embed/preview/rKQqQW/?height=500&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/rKQqQW/'>createQuery</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Zoom or Scale

```js
const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-116.5, 33.80],
  zoom: 14 // what does that really mean?
});
```

- Zoom = LOD (Level of Detail)
- Not all LODs are created equal

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Zoom is not Scale

```js
const view = new MapView({
  container: "viewDiv",
  map: map,
  center: [-116.5, 33.80],
  scale: 50000 // I know what that means!
});
```

- Scale is portable
- Scale has meaning
- We still snap to closest LOD/zoom, [unless you disable it](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html#constraints)

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## goTo() with View

- Sets the view to a given target.
  - Navigate to a geometry/feature/location
- [API Sample](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=scene-goto)

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Patterns

Things you can do to reduce the amount of code you write

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## How the ArcGIS JS API helps you

Open source app starters and templates

[![Esri Github](../../common/images/github-esri.png)](https://github.com/search?o=desc&q=topic%3Ajavascript+org%3AEsri+fork%3Atrue&s=updated&type=Repositories)

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## WebMap is still a Map

```js
const map = new WebMap({
  basemap: { ... },
  layers: [ ... ]
});
```

- Still acts like a regular `Map`
- Has some BIG advantages

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## WebMap is still a Map

<iframe height='500' scrolling='no' title='Local bookmarks' src='//codepen.io/odoe/embed/preview/QxrEVX/?height=500&theme-id=31222&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/odoe/pen/QxrEVX/'>Local bookmarks</a> by Rene Rubalcava (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Widgets!

- We'll look at a few <a href="https://developers.arcgis.com/javascript/latest/sample-code/index.html?search=Widget">widgets</a>
- ~50 Widgets out of the box <!-- .element: class="fragment" data-fragment-index="1" -->
- Widgets help make great apps <!-- .element: class="fragment" data-fragment-index="2" -->
- Less code for you to write <!-- .element: class="fragment" data-fragment-index="3" -->
- Designed with responsive apps in mind <!-- .element: class="fragment" data-fragment-index="4" -->

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Widgets - Expand

 - [Clickable button to open container](https://codepen.io/kellyhutchins/pen/drOGNJ)
 - Icons
 - Group
 - Mode

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Widgets - Use Portal Content

 - [Search](https://codepen.io/kellyhutchins/pen/EMNPmZ)
 - Basemap Gallery
<aside class="notes">Show how we can provide portal and widgets like search and bmg use that content.  </aside>

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Widgets - Architecture

 View + View Model
 ![Search View Model](../../common/images/searchviewmodel.png)

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## View Models

 - [Custom View](https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=widgets-frameworks-react)
 - [Use the view model](https://developers.arcgis.com/example-apps/nearby-javascript/?utm_source=github&utm_campaign=example_apps_nearby_javascript)
  - [Additional Examples](https://odoe.net/blog/view-models-in-the-arcgis-api-for-javascript/)

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Widgets - Styling
 Available Themes
<iframe height="600" style="width: 100%;" scrolling="no" title="Theme Testing" src="https://codepen.io/odoe/embed/preview/oNNGRbz?height=600&theme-id=31222&default-tab=js,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/odoe/pen/oNNGRbz'>Theme Testing</a> by Rene Rubalcava
  (<a href='https://codepen.io/odoe'>@odoe</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

<aside class="notes">Look at ways to customize appearance of widgets</aside>

----

<!-- .slide: data-background="../../common/images/bg-3.png" -->
## Widgets - Styling
 - CSS Extension language
 - SASS
 - [Theme Utility](https://github.com/jcfranco/jsapi-styles)

<aside class="notes">Demo Franco's SASS utility (npm install and show code)</aside>

----

<img src="../../common/images/esri-science-logo-white.png" style="border: 0px; background:none; box-shadow: none;">

----

<!-- .slide: data-background="../../common/images/bg-rating.png" -->
