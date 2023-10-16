import axios from "axios";
import { renderMenu } from "./menu"
import { io } from "https://cdn.socket.io/4.5.4/socket.io.esm.min.js"

import '../css/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

let map
let markersLayer
let fleetOffline

const socket = io('http://localhost:3000')

const operatorIcon = L.icon({
    iconUrl: '../assets/images/logo.png',
    iconSize:     [32, 32],
});

const fleetIcon = L.icon({
    iconUrl: '../assets/images/fleet.png',
    iconSize:     [32, 32],
});

const boxIcon = L.icon({
    iconUrl: '../assets/images/box.png',
    iconSize:     [32, 32],
});

async function getOrders()
{
    const orderList = await axios({
        method: "get",
        url: "http://localhost:3000/order",
    });

    orderList.data.map(order => {
        L.marker([order.destiny_latitude, order.destiny_longitude], {icon: boxIcon}).addTo(map)
    })
}

const renderMap = () =>
{
    map = L.map('map')
    markersLayer = L.layerGroup().addTo(map)
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    navigator.geolocation.getCurrentPosition((position) => {
        map.setView([position.coords.latitude, position.coords.longitude], 13)
        L.marker([position.coords.latitude, position.coords.longitude], {icon: operatorIcon}).addTo(map)
    })

    getOrders()
}

socket.on("operation-location", (message) => {
    markersLayer.clearLayers()
    L.marker([message.latitude, message.longitude], {icon: fleetIcon}).addTo(markersLayer)
    
    clearTimeout(fleetOffline)

    fleetOffline = setTimeout(function(){
        markersLayer.clearLayers()
    }, 3000);
})

renderMenu("map")
renderMap()