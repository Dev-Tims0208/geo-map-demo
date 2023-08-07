




$(window).ready(function () {
    //mapping codes
    // Initialize the map and assign it to a variable for later use
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

    // set points 
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

    $('#exampleModal').on('shown.bs.collapse', function (e) {
        console.log('activated')
        //map.invalidateSize(true);
    })

    // on click view
    $('#propsTable').on('click', '.viewMap', function () {
        // ajax get id
        console.log('clicked');
        var id = $(this).attr('data-id');
        var url = '/api/fetch/property/' + id;
        $.ajax({
            type: 'GET',
            url: url,
            success: function (data) {
                console.log(data);
                console.log(typeof data.coordinates);

                var map2 = L.map('mapsGet', {
                    // Set latitude and longitude of the map center (required)
                    center: [9.783427, 118.732006],
                    // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
                    zoom: 11
                });


                // Create a Tile Layer and add it to the map
                var tiles = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                    minZoom: '15'
                }).addTo(map2);

                var arr = JSON.parse(data.coordinates);

                var polygon = L.polygon(arr).addTo(map2);

                var marker = L.marker(
                    [9.783427, 118.732006],
                    {
                        draggable: true,
                        title: "",
                        opacity: 0.75
                    });

                var center = polygon.getBounds().getCenter()
                console.log(center)

                console.log('basig', center)

                //marker.addTo(map).bindPopup("<p1><b>Puerto Princesa City</b></p1>").openPopup();

                var popup = L.popup();
                setTimeout(function () {
                    map2.invalidateSize(true);
                    map2.panTo(center);
                }, 1500);

                $('#exampleModal').off('hidden.bs.modal').on('hidden.bs.modal', function (e) {
                    map2.remove();
                });

            },
            error: function (error) {
                console.log(error);
            }

        });
    })

});

