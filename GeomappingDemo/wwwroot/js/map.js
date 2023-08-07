﻿// Initialize the map and assign it to a variable for later use
// there's a few ways to declare a VARIABLE in javascript.
// you might also see people declaring variables using `const` and `let`
var map = L.map('map', {
    // Set latitude and longitude of the map center (required)
    center: [9.783427, 118.732006],
    // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
    zoom: 11
});


// Create a Tile Layer and add it to the map
var tiles = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '15'
}).addTo(map);

var arr = [];

var polygon = L.polygon(arr).addTo(map);

var marker = L.marker(
    [9.783427, 118.732006],
    {
        draggable: true,
        title: "",
        opacity: 0.75
    });

marker.addTo(map).bindPopup("<p1><b>Puerto Princesa City</b></p1>").openPopup();



var popup = L.popup();

function onMapClick(e) {
    popup.setLatLng(e.latlng).setContent(e.latlng.toString()).openOn(map);
    // set marker
    marker.setLatLng(e.latlng);
    console.log(e.latlng);
    arr.push(e.latlng);
    polygon.remove();
    //polygon = L.polygon(arr).addTo(map);
    var json = JSON.stringify(arr.map(a => [a.lat, a.lng]));

    $('#post').find('#Coordinates').val(json);

    polygon = L.polygon(JSON.parse(json)).addTo(map);
}

map.on('click', onMapClick);
