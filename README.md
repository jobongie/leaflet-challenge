# Leaflet Challenge

## Leaflet-Step-1

![1-Basic Map](Images/1-Logo.png)

Leaflet-Step-1 shows seismic activity from the last 7 days. Opening this folder and running **python -m http.server** renders the map shown above. The image shown below is the api call from Geo-JSON of all earthquakes that have occurred on a rolling 7 day basis. This is updated accordingly by the USGS.

1. **Legend**- Magnitude determines both the size and color of the markers

2. **Analysis**- Since the USGS publishes the data, you will notice a lack of smaller earthquakes the further away from the US they occur. 


### Geo-JSON

![2-USGS API](Images/Geo_JSON.png)

This API is for the last 7 days earthquake data located here [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) .


- - -

### Level 2: More Data (Optional)


The USGS wants you to plot a second data set on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in a second data set and visualize it along side your original set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.

Brought in the data for this located in the GeoJSON folder, however, not enough time with project work.


### Copyright

Trilogy Education Services © 2019. All Rights Reserved.

License
This collection is made available under the Open Data Commons Attribution License: http://opendatacommons.org/licenses/by/1.0/, please refer to LICENSE.md for more information. Please consider giving Hugo Ahlenius, Nordpil and Peter Bird credit and recognition as a data source.

Credit
Hugo Ahlenius, Nordpil, Peter Bird, and Lizbetheli
