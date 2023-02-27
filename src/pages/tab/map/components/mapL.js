import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import 'leaflet.locatecontrol';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'leaflet-canvas-marker';
import doIcon from '../../../../assets/do.png';
import xanhIcon from '../../../../assets/xanh.png';
import vangIcon from '../../../../assets/vang.png';
import timIcon from '../../../../assets/tim.png';
import xamIcon from '../../../../assets/xam.png';
import placeholder from '../../../../assets/placeholder.png';
import locationIcon from '../../../../assets/locationIcon.png';
import 'projektpro-leaflet-smoothwheelzoom';

function MapL() {

    // const [zoomLevel, setZoomLevel] = useState(16);
    const [data, setData] = useState();
    const [datacay, setDatacay] = useState();
    const locationBtn = document.querySelector('#container .my-location')
    const mapContainerRef = useRef(null)

    useEffect(() => {
        Notiflix.Loading.pulse();
        axios.get('https://test.bunny2.thomi.com.vn/draw/getAllLands', { params: { isHadScaping: false } })
            .then(res => {
                setData({
                    "type": "FeatureCollection",
                    "features": [...res.data]
                });
            })
            .catch(err => {
                console.log(err);
            })
        axios.get('https://test.bunny2.thomi.com.vn/draw/drawOnlyTree')
            .then(res => {
                Notiflix.Loading.remove();
                setDatacay({
                    "type": "FeatureCollection",
                    "features": [...res.data]
                });
            })
            .catch(err => {
                Notiflix.Loading.remove();
                console.log(err);
            })

    }, [])

    useEffect(() => {

        const container = L.DomUtil.get(mapContainerRef.current); if (container != null) { container._leaflet_id = null; }
        var geojson;

        if (container && data && datacay) {
            // khởi tạo map
            var map = L.map('map', {
                // scrollWheelZoom: false, // disable original zoom function
                // smoothWheelZoom: true,  // enable smooth zoom 
                // smoothSensitivity: 1,   // zoom speed. default is 1
            }).setView([11.533204, 107.128444], 17);

            var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
                preferCanvas: true,
                maxZoom: 23,
            }).addTo(map);
            // XỬ LÝ ADD LÔ ĐẤT
            // style lô đất
            const style = (feature) => {
                return {
                    fillColor: '#FFE6C5',
                    weight: 2,
                    opacity: 1,
                    color: 'black',
                    dashArray: '3',
                    fillOpacity: 0.7,
                };
            }
            // xử lý các sự kiện click, hover trên lô 
            const highlightFeature = (e) => {
                var layer = e.target;

                if (layer.setStyle) {
                    layer.setStyle({
                        weight: 2,
                        color: '#666',
                        dashArray: '',
                        fillOpacity: 0.7
                    });
                    // layer.bringToFront();
                    info.update(layer.feature.properties);
                }
            }
            const resetHighlight = (e) => {
                geojson.resetStyle(e.target);
                info.update();
            }

            const zoomToFeature = (e) => {
                if (e.target.getBounds) {
                    map.fitBounds(e.target.getBounds());
                    console.log(e.target.getBounds());
                }
            }
            const onEachFeature = (feature, layer) => {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: zoomToFeature
                });
            }
            // add lô đất
            geojson = L.geoJson(data, {
                style: style,
                onEachFeature: onEachFeature,
            }).addTo(map);
            // tạo info khi hover vào vùng cạo hay lô đất
            var info = L.control();
            // add div info lên map
            info.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
                this.update();
                return this._div;
            };
            // update thông tin lên div info
            info.update = function (props) {
                this._div.innerHTML = '<h4>Tên lô đất</h4>' + (props ?
                    '<b>' + 'lô ' + props.name + '</b><br />'
                    : '');
            };
            // add info vào map
            info.addTo(map);
            // XỬ LÝ ADD CÂY
            // hàm khởi tạo maker
            var ciLayer = L.canvasIconLayer({}).addTo(map);
            // add xự kiện lcick vào maker
            ciLayer.addOnClickListener(function (e, data) {
                console.log(data[0].data.mydata)
            });
            // hàm check icon
            const getIcon = (d) => {
                return d === 'X' ? xanhIcon :
                    d === 'CD' ? timIcon :
                        d === 'KM' ? xamIcon :
                            d === 'K' ? vangIcon :
                                doIcon
            }
            // khởi tạo icon
            const getIconStatus = (status) => {
                var icon = L.icon({
                    // iconUrl: 'data:image/svg+xml;base64,' + btoa(`${svg}`),
                    iconUrl: getIcon(status),
                    iconSize: [20, 18],
                    iconAnchor: [10, 9],
                    className: 'iconCay',
                });
                return icon
            }
            // xử lý conver data geojson sang maker json
            var markers = [];
            for (var i = 0; i < datacay.features.length; i++) {
                var marker = L.marker([datacay.features[i].geometry.coordinates[1], datacay.features[i].geometry.coordinates[0]], { icon: getIconStatus(datacay.features[i].properties.status), rotationAngle: 90 }).bindPopup(datacay.features[i].properties.name1);
                marker.mydata = datacay.features[i].properties.name1
                markers.push(marker);
            }
            ciLayer.addLayers(markers);
            // SỰ KIỆN ZOOM ĐỂ GET TRẠNG THÁI CÂY VÀ XOÁ ĐI LAYER CANVAR
            // custom colors cho trang thái cây
            const getColor = (d) => {
                return d === 'X' ? '#31D100' :
                    d === 'CD' ? '#43439F' :
                        d === 'KM' ? '#967B38' :
                            d === 'K' ? '#FFC000' :
                                '#FF2700'
            }
            // hiển thị ô chữ nhật có text 
            const divIcon = (data) => {
                return L.divIcon({
                    className: 'my-div-icon',
                    html: `<div style="background:${getColor(data.status)}" class="marker-text">${data.name1}</div>`,
                    iconSize: [40, 45],
                    shadowSize: [50, 64],
                    iconAnchor: [20, 40],
                    shadowAnchor: [4, 62],
                    popupAnchor: [0, -40]
                });
            }
            // hàm sự kiện moved
            const movedFunc = () => {
                // Lấy tọa độ của các điểm góc trong LatLngBounds
                var bounds = map.getBounds();
                var northEast = bounds.getNorthEast();
                var southWest = bounds.getSouthWest();

                // Tạo đối tượng đa giác (polygon)
                var polygon = L.polygon([
                    northEast,
                    L.latLng(northEast.lat, southWest.lng),
                    southWest,
                    L.latLng(southWest.lat, northEast.lng)
                ])

                var polygonGeoJSON = polygon.toGeoJSON();

                var polygonJSONString = JSON.stringify(polygonGeoJSON);

                console.log(polygonJSONString);

                axios.get('https://test.bunny2.thomi.com.vn/draw/drawTreeInSquare', {
                    params: {
                        polygon: polygonJSONString
                    }
                })
                    .then(res => {
                        var geojsonitem = L.geoJson({
                            "type": "FeatureCollection",
                            "features": [...res.data]
                        }, {
                            pointToLayer: function (feature, latlng) {
                                var marker = L.marker(latlng, {
                                    icon: divIcon(feature.properties)
                                });
                                marker.bindPopup(feature.properties.name1);
                                return marker;
                            }
                        });
                        // console.log(geojsonitem);
                        geojsonitem.addTo(map);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
            // bắt sự kiện zoom
            map.on('zoomend', function () {
                console.log(map.getZoom());
                if (map.getZoom() > 21) {
                    map.eachLayer(function (layer) {
                        // Kiểm tra xem lớp có phải là LineString hay không
                        if (layer instanceof L.Polyline && layer.toGeoJSON().geometry.type === 'LineString') {
                            // Nếu đúng, xoá lớp khỏi bản đồ
                            map.removeLayer(layer);
                        }
                    });
                    // sự kiện lấy data của cây khi move trên bản đồ
                    map.on('moveend', movedFunc);
                } else {
                    map.off('moveend', movedFunc);
                    map.eachLayer(function (layer) {
                        if (layer instanceof L.Marker && layer.options.icon.options.className === "my-div-icon") {
                            map.removeLayer(layer);
                        }
                        else if (layer instanceof L.LayerGroup) {
                            var hasPoints = false;
                            layer.eachLayer(function (subLayer) {
                                if (subLayer instanceof L.Marker && subLayer.options.icon.options.className === "my-div-icon") {
                                    hasPoints = true;
                                    return;
                                }
                            });
                            if (hasPoints) {
                                layer.clearLayers();
                            }
                        }
                    });
                }
            })
            // bắt sự kiện click để hiển thị vị trí hiện tại 
            let islocation = 0;
            let currentlocation;
            locationBtn.addEventListener('click', () => {
                Notiflix.Loading.pulse();
                if (islocation == 1) {
                    map.removeLayer(currentlocation).setView([11.534428, 107.129069], 17)
                    locationBtn.style.background = '#fff'
                    locationBtn.style.color = '#000'
                    islocation = 0
                    Notiflix.Loading.remove();
                } else {
                    // Lấy vị trí hiện tại của thiết bị
                    navigator.geolocation.getCurrentPosition(function (position) {
                        var pos = [position.coords.latitude, position.coords.longitude];
                        map.setView(pos, 19);
                        var customIcon = L.icon({
                            iconUrl: locationIcon,
                            iconSize: [17, 17], // kích thước của icon
                            iconAnchor: [8.5, 8.5], // điểm neo của icon
                            popupAnchor: [0, -8.5] // vị trí hiển thị popup
                        });
                        currentlocation = L.marker(pos, { icon: customIcon }).addTo(map)
                        Notiflix.Loading.remove();
                    });
                    locationBtn.style.background = '#6AB100'
                    locationBtn.style.color = '#fff'
                    islocation += 1
                }
            })
        }

    }, [datacay])
    return (
        <div id='map' ref={mapContainerRef} style={{ height: 'calc(100% - 61px)', width: '100%vw' }} />
    )
}

export default MapL