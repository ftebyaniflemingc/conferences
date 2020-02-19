# Welcome Session

90 minutes

JS - 18 minutes

## Performance (3-4 min)

- VTL
  - First draw comparison is faster. Load performance.
  - Improve load performance by 30-40%
  - Fetch tiles in parallel. And draw them in parallel
- Feature Tiles -
  - Video about performance improvements.
    - Jeremy's video showing perf improvements side-by-side
  - Why? show request headers in screen shot
    - pbf, brotli compression, quantization, cache-able tile, Data is rendered with WebGL on the client
    - pbf - format optimized for data transfer
    - only request attributes required for rendering (more efficient)
    - http2 protocol - reduces size and time of the transport
    - quantized (generalized to appropriate resolution)
    - JS API requests tiles features as cacheable tiles
      - in browser
      - at CDN (public)
      - within infrastructure...so we don't have to query the database.
    - if you update, db will be requeried and cached so you don't have to rebuild tiles

    cache on browser, then CDN, then server, then db query

- WebGL on a VM (virtualized client)
  - browser gif
  - Set up style and histogram range slider for Andy

  - 16GB VM with no graphics card
  - running in a 32 bit browser
  - Map load

## Visualization and client-side analytics (10 min)

All the performance improvements we've made allows you to make highly interactive applications.

### Flash flood warnings

[Live app](http://localhost/conferences/ds-2019/plenary/flash-flood-warnings/)

- Demonstrate the performance improvements just described
- Perf improvements take full advantage of GPU for fast interaction/analytics/visualization
- Polygon dataset representing areas issued a flash flood warning over 10 year period
- Since data is on the client can filter the data client-side with fast performance

- A common way to explore data is by filtering it

- Filter by season
- Query stats on the layer and grouped them by season and duration
  - filter snippet just like you would query a server
- Query happens on the client since the data is already there!

- You can filter while applying an effect on the features that don't satisfy the filter.
  - snippet with geometry filter in effect

### Temperature anomaly/fast updates/arcade

[Live app](https://developers.arcgis.com/javascript/latest/sample-code/visualization-update-data/index.html)

Talking points:

show fat table

global Temperature anomaly data from 1880-2018
120 fields in the FeatureLayer
update the viz based on changing the field attribute
this happens by changing the field referenced in the visual variables

This viz can quickly update without any stutter or slowdown

How?

since it's webgl gpu, all the attributes are stored in a texture on the gpu, which is directly linked to the geometry rather than rebuilding a new texture every time the data changes, because it's already there.

- data/attributes on graphic's card
- Show the data in a table (fat table)

### WebStyleSymbols (CIM) scaled with color locking

[NPS Stats](https://localhost/conferences/fed-2020/presentations/welcome/demos/national-parks/cim.html)

show fat table here too

- JS API can now work with CIM (cartographic information model)
multi layer vector symbols (scalable),

- hundreds of OOB symbols provided by API.
Powered by CIM (cartographic information model) - maybe refer to Kerry's presentation here.

And they are multilayer...notice the color of the tree symbol layer changes with the data.
Purple indicates parks that experienced a decrease in visits while a a green color indicates parks that had an increase in visitors.

customizable, So you can change the out of the box symbol to your liking...

...either change shape or color of border or fill

### Global power plants - clustering

[Live app](https://developers.arcgis.com/javascript/latest/sample-code/featurereduction-cluster-filter-slider/live/index.html)

- mention number of points (~30k power plants)
- Simply enable clustering
- show cluster snippet

- clustering recalculates on the client with every filter change
- API takes care of everything, the color of the cluster summarizes the style
- show filter snippet

### Ocean viz (3D) - interactivity, sliders, filters

[Live app](http://localhost/esri-ts-samples/visualization/emu/3d/)

## Building apps (5 min)