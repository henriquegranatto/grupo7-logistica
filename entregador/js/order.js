import axios from "axios";
import { renderMenu } from "./menu";

import '../css/order.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import * as bootstrap from 'bootstrap'

async function getOrders()
{
    const orderList = await axios({
        method: "get",
        url: `http://localhost:3000/fleet/orders/${localStorage.getItem("user_id")}`,
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
        </tr>`
    })
}

renderMenu("order")
getOrders()