import axios from "axios";
import { renderMenu } from "./menu";

import '../css/order.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import * as bootstrap from 'bootstrap'

let OrderOriginData = {}
let OrderDestinyData = {}

// This function get all orders from the API and render it on the table
async function getOrders()
{
    const orderList = await axios({
        method: "get",
        url: "http://localhost:3000/order",
    });

    document.querySelector('#orderTable tbody').innerHTML = ""

    orderList.data.map(order => {
        const fleetColumn = order.fleet 
        ? `<button type="button" class="btn btn-primary" onclick="openAssignFleetModal(${order.id})">${order.fleet}</button>`
        : `<button type="button" class="btn btn-primary" onclick="openAssignFleetModal(${order.id})">Não atribuído</button>`

        document.querySelector('#orderTable tbody').innerHTML +=
        `<tr>
            <td class="col-3">${order.code}</td>
            <td class="col-3">${order.origin_address}</td>
            <td class="col-3">${order.destiny_address}</td>
            <td class="col-3">
                ${fleetColumn}
                <button type="button" class="btn btn-danger" onclick="deleteOrder(${order.id})">Excluir</button>
            </td>
        </tr>`
    })
}
// This function creates an order and send it to the API
async function createOrder()
{
    document.querySelector('#btnCreateOrder').style.display = "none"
    document.querySelector('#btnCreateOrderLoading').style.display = "block"

    const payload = 
    {
        "code": document.getElementById("formOrderCode").value,
        "fleet": null,
        "origin": {
            "address": OrderOriginData.address,
            "latitude": OrderOriginData.latitude,
            "longitude": OrderOriginData.longitude
        },
        "destiny": {
            "address": OrderDestinyData.address,
            "latitude": OrderDestinyData.latitude,
            "longitude": OrderDestinyData.longitude
        }
    }

    const orderCreated = await axios({
        method: "post",
        data: payload,
        url: "http://localhost:3000/order",
    });

    const modal = bootstrap.Modal.getInstance(document.querySelector('#createOrderModal'))

    OrderOriginData = {}
    OrderDestinyData = {}

    document.getElementById("formOrderCode").value=""
    document.getElementById("formOrderOrigin").value=""
    document.getElementById("formOrderDestiny").value=""
    document.querySelector('#btnCreateOrder').style.display = "block"
    document.querySelector('#btnCreateOrderLoading').style.display = "none"

    await getOrders()
    await modal.hide()
}
// This function deletes an order and send it to the API
async function deleteOrder(order)
{
    const orderCreated = await axios({
        method: "delete",
        url: `http://localhost:3000/order/${order}`,
    });

    await getOrders()
}
// This function opens the modal to assign a fleet to an order
async function openAssignFleetModal(order)
{
    const modal = new bootstrap.Modal(document.querySelector('#assignFleetModal'))

    const fleetList = await axios({
        method: "get",
        url: "http://localhost:3000/fleet",
    });

    document.querySelector('#formFleet').innerHTML = ""

    fleetList.data.map(fleet => document.querySelector('#formFleet').innerHTML += `<option value="${fleet.id}">${fleet.name}</option>`)

    await modal.show()
}

window.deleteOrder = deleteOrder
window.createOrder = createOrder
window.openAssignFleetModal = openAssignFleetModal

window.onload = function () 
{
    const formOrderOrigin = document.getElementById('formOrderOrigin')
    const formOrderDestiny = document.getElementById('formOrderDestiny')
    
    const autocompleteFormOrderOrigin = new google.maps.places.Autocomplete(formOrderOrigin);
    const autocompleteFormOrderDestiny = new google.maps.places.Autocomplete(formOrderDestiny);
   
    google.maps.event.addListener(autocompleteFormOrderOrigin, 'place_changed', function() {
        const place = autocompleteFormOrderOrigin.getPlace();
        OrderOriginData.address = place.formatted_address
        OrderOriginData.latitude = place.geometry.location.lat()
        OrderOriginData.longitude = place.geometry.location.lng()
    });

    google.maps.event.addListener(autocompleteFormOrderDestiny, 'place_changed', function() {
        const place = autocompleteFormOrderDestiny.getPlace();
        OrderDestinyData.address = place.formatted_address
        OrderDestinyData.latitude = place.geometry.location.lat()
        OrderDestinyData.longitude = place.geometry.location.lng()
    });

    renderMenu("order")
    getOrders()
}