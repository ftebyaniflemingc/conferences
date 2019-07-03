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

- client vs server behavior
  - layerviews vs layer

- queryFeatures
  - statistics
- highlight
- filter - R
- effect - R
- time - R

- histogram
- histogram range slider
- timeslider

## Demos

/sample-code/layers-scenelayerview-query-stats/index.html
/sample-code/featurelayerview-query-distance/index.html
/sample-code/featurelayerview-query-geometry/index.html
t/sample-code/timeslider-filter/index.html
/sample-code/visualization-update-data/index.html
/latest/sample-code/visualization-histogram-color/index.html
/latest/sample-code/widgets-histogramrangeslider/index.html
/latest/sample-code/widgets-histogram/index.html
https://ekenes.github.io/esri-ts-samples/query/neighbor-comparison/touches.html
https://ekenes.github.io/conferences/ds-2019/plenary/dot-density-housing/index.html
https://ekenes.github.io/conferences/ds-2019/plenary/flash-flood-warnings/index.html
https://ekenes.github.io/conferences/ds-2019/plenary/dot-density-legend/index.html

Histogram

-Histogram normal
-Histogram color
-Histogram update field and extent

HistogramRangeSlider

-filter
-effect
-highlight

-Population Growth
3D EMU


:thu

### [Trees](https://ekenes.github.io/conferences/ds-2019/3d-viz-2d-data/demos/trees/2-models.html)

Visualizes trees with their real world sizes using a 3D model provided out-of-the-box in the ArcGIS API for JavaScript.

### [GeoJSON earthquakes](https://ycabon.github.io/2019-devsummit-plenary/2_geojson.html)

Demonstrates how to use a layer's attributes to calculate z values for each feature so it renders its position
correctly in a 3D scene.

### [Ecological Marine Units](https://ekenes.github.io/esri-ts-samples/visualization/emu/3d/)

Visualizes points as 3D cylinders to represent a section of the Indian Ocean. Each point has various data attributes that can be explored, filtered, and sliced. This demonstrates how to represent a point as a volume and how to place that point correctly with a z value that comes from an attribute (not from geometry). It also shows how you can add exaggeration to an elevation surface to make a more pleasing visual. The exaggeration also coincides with all the elevation values in the data.

### [Hiking Trails](https://ralucanicola.github.io/hiking-app/)

A 3D progressive web application allowing you to explore Swiss hiking trails.

[Live app](https://ralucanicola.github.io/hiking-app/)

[Code](https://github.com/RalucaNicola/hiking-app)

### [3D elevation contours](https://ralucanicola.github.io/JSAPI_demos/malta-contour-lines/)

A 3D thematic representation of contour data.

[Live app](https://ralucanicola.github.io/JSAPI_demos/malta-contour-lines/)

[Code](https://github.com/RalucaNicola/JSAPI_demos/tree/master/malta-contour-lines)
