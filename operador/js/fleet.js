import { renderMenu } from "./menu";

import '../css/index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

async function getFleets()
{
    const fleetList = await axios({
        method: "get",
        url: "http://localhost:3000/fleet",
    });

    document.querySelector('#fleetTable tbody').innerHTML = ""

    fleetList.data.map(fleet => {
        document.querySelector('#fleetTable tbody').innerHTML +=
        `<tr>
            <td class="col-3">${fleet.picture}</td>
            <td class="col-3">${fleet.name}</td>
            <td class="col-3">${fleet.email}</td>
        </tr>`
    })
}

window.onload = function () 
{
    renderMenu("fleet")
    getFleets()
}