import axios from "axios";
import { renderMenu } from "./menu";

import "../css/index.css"
import "bootstrap-icons/font/bootstrap-icons.css"

let map

const fleetIcon = L.icon({
    iconUrl: '../assets/images/logo.png',
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
        url: `http://localhost:3000/fleet/orders/${localStorage.getItem("user_id")}`,
    });

    orderList.data.map(order => {
        L.marker([order.destiny_latitude, order.destiny_longitude], {icon: boxIcon}).addTo(map)
    })
}

const renderMap = () =>
{
    map = L.map("map")
    
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    navigator.geolocation.getCurrentPosition((position) => {
        map.setView([position.coords.latitude, position.coords.longitude], 13)
        L.marker([position.coords.latitude, position.coords.longitude], {icon: fleetIcon}).addTo(map)
    })

    getOrders()
}

renderMenu("map")
renderMap()