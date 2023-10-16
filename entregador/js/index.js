import { renderMenu } from "./menu";

import "../css/index.css"
import "bootstrap-icons/font/bootstrap-icons.css"

let map

const renderMap = () =>
{
    map = L.map("map")
    
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map)

    navigator.geolocation.getCurrentPosition((position) => {
        map.setView([position.coords.latitude, position.coords.longitude], 13)
        L.marker([position.coords.latitude, position.coords.longitude]).addTo(map)
    })
}

renderMenu("map")
renderMap()