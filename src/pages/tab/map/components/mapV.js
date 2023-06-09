import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import Notiflix from 'notiflix';
import 'leaflet.locatecontrol';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'leaflet-canvas-marker';
import placeholder from '../../../../assets/placeholder.png';
import locationIcon from '../../../../assets/locationIcon.png';
import 'projektpro-leaflet-smoothwheelzoom';


function MapV() {

    // const [zoomLevel, setZoomLevel] = useState(16);
    const [data, setData] = useState();
    const [datacay, setDatacay] = useState();
    const locationBtn = document.querySelector('#container .my-location')
    const mapContainerRef = useRef(null)

    useEffect(() => {
        axios.get('https://test.bunny2.thomi.com.vn/draw/getAllLands', { params: { isHadScaping: true } })
            .then(res => {
                setData({
                    "type": "FeatureCollection",
                    "features": [...res.data]
                });
            })
            .catch(err => {
                console.log(err);
            })

    }, [])

    useEffect(() => {

        const container = L.DomUtil.get(mapContainerRef.current); if (container != null) { container._leaflet_id = null; }
        var geojson;

        // Khởi tạo sự kiện zoom smoth
        L.Map.mergeOptions({
            smoothWheelZoom: true,
            smoothSensitivity: 1

        });

        L.Map.SmoothWheelZoom = L.Handler.extend({

            addHooks: function () {
                L.DomEvent.on(this._map._container, 'wheel', this._onWheelScroll, this);
            },

            removeHooks: function () {
                L.DomEvent.off(this._map._container, 'wheel', this._onWheelScroll, this);
            },

            _onWheelScroll: function (e) {
                if (!this._isWheeling) {
                    this._onWheelStart(e);
                }
                this._onWheeling(e);
            },

            _onWheelStart: function (e) {
                var map = this._map;
                this._isWheeling = true;
                this._wheelMousePosition = map.mouseEventToContainerPoint(e);
                this._centerPoint = map.getSize()._divideBy(2);
                this._startLatLng = map.containerPointToLatLng(this._centerPoint);
                this._wheelStartLatLng = map.containerPointToLatLng(this._wheelMousePosition);
                this._startZoom = map.getZoom();
                this._moved = false;
                this._zooming = true;

                map._stop();
                if (map._panAnim) map._panAnim.stop();

                this._goalZoom = map.getZoom();
                this._prevCenter = map.getCenter();
                this._prevZoom = map.getZoom();

                this._zoomAnimationId = requestAnimationFrame(this._updateWheelZoom.bind(this));
            },

            _onWheeling: function (e) {
                var map = this._map;

                this._goalZoom = this._goalZoom + L.DomEvent.getWheelDelta(e) * 0.003 * map.options.smoothSensitivity;
                if (this._goalZoom < map.getMinZoom() || this._goalZoom > map.getMaxZoom()) {
                    this._goalZoom = map._limitZoom(this._goalZoom);
                }
                this._wheelMousePosition = this._map.mouseEventToContainerPoint(e);

                clearTimeout(this._timeoutId);
                this._timeoutId = setTimeout(this._onWheelEnd.bind(this), 200);

                L.DomEvent.preventDefault(e);
                L.DomEvent.stopPropagation(e);
            },

            _onWheelEnd: function (e) {
                this._isWheeling = false;
                cancelAnimationFrame(this._zoomAnimationId);
                this._map._moveEnd(true);
            },

            _updateWheelZoom: function () {
                var map = this._map;

                if ((!map.getCenter().equals(this._prevCenter)) || map.getZoom() != this._prevZoom)
                    return;

                this._zoom = map.getZoom() + (this._goalZoom - map.getZoom()) * 0.3;
                this._zoom = Math.floor(this._zoom * 100) / 100;

                var delta = this._wheelMousePosition.subtract(this._centerPoint);
                if (delta.x === 0 && delta.y === 0)
                    return;

                if (map.options.smoothWheelZoom === 'center') {
                    this._center = this._startLatLng;
                } else {
                    this._center = map.unproject(map.project(this._wheelStartLatLng, this._zoom).subtract(delta), this._zoom);
                }

                if (!this._moved) {
                    map._moveStart(true, false);
                    this._moved = true;
                }

                map._move(this._center, this._zoom);
                this._prevCenter = map.getCenter();
                this._prevZoom = map.getZoom();

                this._zoomAnimationId = requestAnimationFrame(this._updateWheelZoom.bind(this));
            }

        });

        L.Map.addInitHook('addHandler', 'smoothWheelZoom', L.Map.SmoothWheelZoom);

        if (container && data) {
            // KHỞI TẠO MAP
            var map = L.map('map', {
                scrollWheelZoom: false, // disable original zoom function
                smoothWheelZoom: true,  // enable smooth zoom 
                smoothSensitivity: 1,   // zoom speed. default is 1
            }).setView([11.533204, 107.128444], 17);
            var tiles = L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
                preferCanvas: true,
                maxZoom: 22
            }).addTo(map);
            // XỬ LÝ ADD LÔ ĐẤT
            // style lô đất và vùng cạo
            const style = (feature) => {
                if (feature.properties.type === "SCAPING") {
                    return {
                        fillColor: '#C9FFB8',
                        weight: 2,
                        opacity: 1,
                        color: '#FF362D',
                        dashArray: '3',
                        fillOpacity: 0.7,
                        zIndexOffset: 10
                    };
                } else {
                    return {
                        // fillColor: getColor(feature.properties.status),
                        fillColor: 'transparent',
                        weight: 2,
                        opacity: 1,
                        color: 'black',
                        dashArray: '3',
                        fillOpacity: 0.7,
                        zIndexOffset: 10
                    };
                }
            }

            // xử lý các sự kiện click, hover trên lô và vùng cạo
            const highlightFeature = (e) => {
                var layer = e.target;

                if (layer.setStyle) {
                    layer.setStyle({
                        weight: 2,
                        color: '#000',
                        // fillColor: '#66ff66',
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
            // add lô đất và vùng cạo
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
                this._div.innerHTML = '<h4>Tên lô/vùng cạo:</h4>' + (props ?
                    '<b>' + props.name + '</b><br />'
                    : '');
            };
            // add info vào map
            info.addTo(map);
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
                if (map.getZoom() >= 21.96) {
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
                L.control.locate()
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        // do something with the user's position
                        console.log('my location');
                        if (islocation == 1) {
                            map.removeLayer(currentlocation).setView([11.534428, 107.129069], 17)
                            locationBtn.style.background = '#fff'
                            locationBtn.style.color = '#000'
                            islocation = 0
                            Notiflix.Loading.remove();
                        } else {
                            // Lấy vị trí hiện tại của thiết bị
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
                            locationBtn.style.background = '#6AB100'
                            locationBtn.style.color = '#fff'
                            islocation += 1
                        }
                    }, function (error) {
                        console.log(error);
                        if (error.code === error.PERMISSION_DENIED) {
                            // alert("Vui lòng bật chia sẻ vị trí để sử dụng tính năng này.");
                            Notiflix.Loading.remove();
                        } else {
                            alert("Thiết bị không truy cập được vị trí.");
                            Notiflix.Loading.remove();
                        }
                    });
                } else {
                    alert("Trình duyệt của bạn không hỗ trợ chia sẻ vị trí.");
                }

            })
        }

    }, [data])
    return (
        <div id='map' ref={mapContainerRef} style={{ height: 'calc(100% - 61px)', width: '100%' }} />
    )
}

export default MapV