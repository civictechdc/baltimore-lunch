/*jslint browser: true*/
/*global L, $ */

(function (window, document, $, L, undefined) {
    'use strict';

    L.Icon.Default.imagePath = 'images/';

    var map = L.map('map', {
        center: [39.3133, -76.6167],
        zoom: 12
    });

    new L.tileLayer('http://api.tiles.mapbox.com/v3/cmgiven.hpfpddp6/{z}/{x}/{y}.png', {
        minZoom: 0,
        maxZoom: 18,
        attribution: '<a href="https://www.mapbox.com">Mapbox</a>'
    }).addTo(map);

    var locations = L.layerGroup().addTo(map);

    $(function () {
        $.when(
            $.ajax('data/locations.json')
        ).done(function (data) {
            locations.clearLayers();
            $.each(data, function () {
                L.marker([this._longitude, this._latitude], {
                }).addTo(locations)
                .bindPopup('<strong>' +
                    this._name + 
                    '</strong><br />' +
                    this._address +
                    '<br />Hours: ' +
                    this._time);
            });
        });
    });

}(window, document, $, L));