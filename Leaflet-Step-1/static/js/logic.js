// if config.js file is missing API_KEY
if (typeof API_KEY === "undefined") {
    console.log("API_KEY NOT PRESENT", "PLEASE MAKE A config.js file in static with an API_Key");
    console.warn(`API_KEY NOT PRESENT
PLEASE MAKE A config.js file in static with an API_Key`);
    window.alert(`API_KEY NOT PRESENT
PLEASE MAKE A config.js file in static with an API_Key`);
} else {
    console.log("API_KEY IS PRESENT");
}

// queryURLfor Day, Week and Month
const queryURLDay = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
const queryURLWeek = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
const queryURLMonth = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// queryLocal for Day, Week and Month
const queryLocalDay = "./static/data/all_day_10-01-2019.geojson";
const queryLocalWeek = "./static/data/all_week_10-01-2019.geojson";
const queryLocalMonth = "./static/data/all_month_10-01-2019.geojson";

// get from local folder
// can get from website or from local folder, your pick
d3.json(queryURLWeek, function(err, data) {
    
    // throw away any errors if they occur
    if (err) throw err;

    // console.log() the .json for more information
    console.log(data);
    // console.log(data.features);
    // console.log(data.features[0]);
    // console.log(data.features[0].geometry);
    // console.log(data.features[0].properties);

    // send the data.features object to createFeatures function
    createFeatures(data.features); 
});

// FUNCTION #1 //
// This function is resonsiple for setting up circle markers,
// radius and colour for them and bind a popup to the circle
function createFeatures(data) {
// console.log(data);

    // FUNCTION #2 //
    // Nested function to determine the colour of a circle
    // based on the magnitude value
    function getColor(data) {

        // initialize colour variable
        var colour;

        // use conditional to get colour (yellow to red)
        if (data.properties.mag >= 0 && data.properties.mag < 1) {
            // yellow
            colour = "#ffff00";
        } else if (data.properties.mag >= 1 && data.properties.mag < 2) {
            colour = "#ffc800";
        } else if (data.properties.mag >= 2 && data.properties.mag < 3) {
            colour = "#ff9600";
        } else if (data.properties.mag >= 3 && data.properties.mag < 4) {
            colour = "#ff6400";
        } else if (data.properties.mag >= 4 && data.properties.mag < 5) {
            colour = "#ff3200";
        } else {
            // red
            colour = "#ff0000";
        }

        // return the colour as a string containing
        // a hexadecimal value
        return colour;
    }

    // radius and colour of circles is dependant on mag value
    // radius is multiplied by a constant
    // colour is an output from getColor() function
    var radiusConstant = 1.5;
    var earthRadius = data.map(d => d.properties.mag * radiusConstant);
    var earthFillColour = data.map(d => getColor(d));
    
    // ready circles array
    var circles = [];

    // for loop that iterates through and appends values to circles
    // array
    for (var i = 0; i < data.length; i++) {

        // append to circles array
        circles.push(

            // append circleMarker to circles array
            // append the latitude and longitude in [lat, long] format
            // <https://leafletjs.com/reference-1.5.0.html#circlemarker>
            L.circleMarker([data[i].geometry.coordinates[1],
                data[i].geometry.coordinates[0]],

                // input CircleMarker options
                {

                // radius and fill color are arrays
                // the rest are constants
                radius: earthRadius[i],
                fillColor: earthFillColour[i],
                color: "#000000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
                })
                
                // Bind a popup to all the layers at once, like bindTooltip
                // bindPopup uses HTML elements which are shown below
                // <https://leafletjs.com/reference-1.5.0.html>
                .bindPopup("<h3>" + data[i].properties.place +
                "</h3><hr><h4>Magnitude: " + data[i].properties.mag + " " +
                data[i].properties.magType + "</h4><hr><p>" + 
                new Date(data[i].properties.time) + "</p>")
        );
    }
    // console.log the resultant array
    // call up createMap() function to form the map in <div id="map">
    console.log(circles);
    createMap(circles);
}
// FUNCTION #3 //
// This function is responsible for taking in the array of circleMarkers
// Create a map in <div id="map">
function createMap(data) {
  
    // streetmap layer
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    });

    // darkmap layer
    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.dark",
        accessToken: API_KEY
    });

    // satellite layer
    var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.satellite",
        accessToken: API_KEY
    });

    // light layer
    var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.light",
        accessToken: API_KEY
    });

    // outdoors layer
    var outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.outdoors",
        accessToken: API_KEY
    });
    
    // Define a baseMaps object to hold our mapbox base layers
    var baseMaps = {
        "Street Map": streetmap,
        "Light / Greyscale Map": light,
        "Dark Map": darkmap,
        "Satellite Map": satellite,
        "Outdoor Map": outdoors
    };

    // make a overlayer group with the circleMarkers and call it
    // earthquake
    var earthquake = L.layerGroup(data);

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquake
    };

    // Create our map, giving it the streetmap and
    // earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
        37.1, -95.7
        ],
        zoom: 2,
        layers: [streetmap, earthquake]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);

    // Add a scale to the map
    L.control.scale().addTo(myMap);

    // FUNCTION #4 //
    // Nested function to determine the colour of the square
    // in the legend based on the magnitude value
    function getColor(d) {
    return d > 5   ? "#ff0000" :
           d >= 4  ? "#ff3200" :
           d >= 3  ? "#ff6400" :
           d >= 2  ? "#ff9600" :
           d >= 1  ? "#ffc800" :
           d >= 0  ? "#ffff00" :
                     "#000000";
    }

    // Add a base class for map controls
    // <https://leafletjs.com/reference-1.5.0.html#control>
    var legend = L.control({position: 'bottomright'});

    // return container DOM element for the control and add listeners
    legend.onAdd = function (map) {
    
        // Leaflet function to work with DOM tree
        // <https://leafletjs.com/reference-1.5.0.html#domutil>
        // .create makes <div> with class="info legend"
        // magnitudes array
        var div = L.DomUtil.create('div', 'info legend'),
        magnitudes = [0, 1, 2, 3, 4, 5],
        labels = [];
    
        // loop through our density intervals and generate a
        // label with a colored square for each interval
        div.innerHTML = "<h4><strong>Magnitude<br>Legend</strong><h4><hr>";
        for (var i = 0; i < magnitudes.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(magnitudes[i] + 1) + '"></i> ' +
                magnitudes[i] + (magnitudes[i + 1] ? ' &ndash; ' + magnitudes[i + 1] + '<br>' : '+');
        }
        
        // return the <div> with all the elements given above
        return div;
    };
    
    // add the legend to the map
    legend.addTo(myMap);
}