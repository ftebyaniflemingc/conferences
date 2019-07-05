# Interactive Client-Side Web Mapping with the ArcGIS API for JavaScript

length: 60 min

presenters: Richie Carmichael, Kristian Ekenes

July 10, 2019, 10:00 am - 11:00 am

SDCC - Room 15 B

## Summary

Discover the client-side technologies baked into the JavaScript API to create powerful interactive applications. In this session you will learn about the different technologies that have been developed that allow you execute complex geometric operations on features without doing a round trip to a server. We will also showcase some examples like on-the-fly statistical analysis that could spark new ideas for original data interactions in your applications.

## Presentation

link to slides

## Outline

- Layers and Layer Views
- Client-side queries
- Time
- Filters & Effects
- Updating Renderers
  - Visual Variables
  - Data Variables
- Widgets and charts
  - Histogram
  - HistogramRangeSlider

## Demos

### Client-side Queries

#### [Query 3D SceneLayer by distance](https://developers.arcgis.com/javascript/latest/sample-code/layers-scenelayerview-query-stats/live/index.html)

Highilghts buildings within a specified distanced of a sketched geometry in the view and summarizes the buildings by building material type.

#### [Query 2D FeatureLayer by distance](https://developers.arcgis.com/javascript/latest/sample-code/featurelayerview-query-distance/live/index.html)

Allows the user to explore homicide data broken down by race, gender, age, and the status of the case. This queries statistics client-side.

#### [Age Pyramid - query by geometry](https://developers.arcgis.com/javascript/latest/sample-code/featurelayerview-query-geometry/live/index.html)

Creates an age pyramid for features within a given radius and udpates on every mouse move.

#### [Query neighbors](https://ekenes.github.io/esri-ts-samples/query/neighbor-comparison/touches.html)

Queries cities in Mexico for education stats and compares them based on the average value of the same attribute for the neighboring features and the entire dataset.

#### [Flash flood warnings](https://ekenes.github.io/conferences/ds-2019/plenary/flash-flood-warnings/index.html)

Queries flash flood warnings within a specified distance of the cursor and summarizes them in a custom chart.

### Time

Earthquakes

### Filters and Effects

### Updating Renderers

#### [Population Density by race/ethnicity](https://ekenes.github.io/conferences/ds-2019/plenary/dot-density-legend/index.html)

This app allows the user to emphasize subgroups of the population in the United States by adding transparency to groups not selected in the Legend.

#### [Housing density by decade](https://ekenes.github.io/conferences/ds-2019/plenary/dot-density-housing/index.html)

This app animates housing construction density by updating the opacity of dot colors.

#### [Margin of victory - voting precints](https://developers.arcgis.com/javascript/latest/sample-code/visualization-vv-opacity-animate/live/index.html)

This app visualizes how contested voting was on the precinct level of the 2008 United States presidential election.

#### [Median household income](https://developers.arcgis.com/javascript/latest/sample-code/visualization-histogram-color/live/index.html)

Visualizes median household income in the United States using a color visual variable. The user can update and explore the visualization using the ColorSlider widget, which includes a colored histogram that also updates each time the user slides the slider thumbs.

#### [Temperature anomaly](https://developers.arcgis.com/javascript/latest/sample-code/visualization-update-data/live/index.html)

Visualizes temperature anomaly from 1880-2018. The service contains an attribute field for each year between 1880 and 2018. The visual variable stops of the renderer don't change, but the attribute value does when the user slides the slider from one year to the next. A colored histogram also updates as the slider updates.

#### [Population change](https://ekenes.github.io/conferences/uc-2019/interactive-apps/demos/pop-change.html)

Visualizes population change from 1950-2015. The service contains an attribute field for the population of each year from 1950-2015. The visual variable stops of the renderer don't change, but the attribute value does when the user slides the slider from one year to the next. A colored histogram also updates as the slider updates.

### Widgets and charts

#### [Basic Histogram](https://ekenes.github.io/conferences/uc-2019/interactive-apps/demos/histogram/basic.html)

Visualizes sea temperature in the Indian ocean using a Histogram widget.

#### [Histogram with colored bars](https://ekenes.github.io/conferences/uc-2019/interactive-apps/demos/histogram/colored-bars.html)

Visualizes sea temperature in the Indian ocean using a Histogram widget. The histogram widget bars are colored to match the features on the map falling in to each bin.

#### [Update Histogram data](https://ekenes.github.io/conferences/uc-2019/interactive-apps/demos/histogram/update-data.html)

Allows the user to explore various data attributes using the histogram and Smart Mapping APIs.

#### [HistogramRangeSlider - filter](https://ekenes.github.io/conferences/uc-2019/interactive-apps/demos/histogram-range-slider/filter.html)

This app demonstrates how you can set up a HistogramRangeSlider and use it to filter features in the layer view.

#### [HistogramRangeSlider - filter](https://ekenes.github.io/conferences/uc-2019/interactive-apps/demos/histogram-range-slider/effect.html)

This app demonstrates how you can set up a HistogramRangeSlider and use it to filter features in the layer view with an effect used to exclude features from the filter.

#### [HistogramRangeSlider - filter](https://ekenes.github.io/conferences/uc-2019/interactive-apps/demos/histogram-range-slider/highlight.html)

This app demonstrates how you can set up a HistogramRangeSlider and use it to highlight features in a SceneView.

### [Ecological Marine Units](https://ekenes.github.io/esri-ts-samples/visualization/emu/3d/)

Visualizes points as 3D cylinders to represent a section of the Indian Ocean. Each point has various data attributes that can be explored, filtered, and sliced. This demonstrates how to represent a point as a volume and how to place that point correctly with a z value that comes from an attribute (not from geometry). It also shows how you can add exaggeration to an elevation surface to make a more pleasing visual. The exaggeration also coincides with all the elevation values in the data.
