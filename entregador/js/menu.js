import axios from "axios";
import * as bootstrap from 'bootstrap'
import { io } from "https://cdn.socket.io/4.5.4/socket.io.esm.min.js";

import menu from '../html/menu.html?raw'

import "../css/menu.css"

const socket = io('http://localhost:3000')

const renderMenu = (actualPage) =>
{
    document.querySelector('header').innerHTML = menu
    changeMenuColor(actualPage)
    googleSignIn()
}

const changeMenuColor = (actualPage) =>
{
    document.querySelector(`#menu-${actualPage} a`).classList.remove("text-white")
    document.querySelector(`#menu-${actualPage} a`).classList.add("text-secondary")
}

const decodeJWT = (token) => 
{
    let base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const payload = decodeURIComponent(window.atob(base64).split("").map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(""));

    return JSON.parse(payload);
}

const googleSignIn = () =>
{
    if(localStorage.getItem("user_id") == null)
    {
        google.accounts.id.initialize({
            client_id: "1088063897907-t25q43ps71hmm24ta010mh0qb90a84uc.apps.googleusercontent.com",
            callback: onSignIn
        })
    
        google.accounts.id.prompt();
    }
    else
    {
        showUserAndCollectLocation()
    }
}

const showUserAndCollectLocation = () =>
{
    document.querySelector('#user_name').textContent = localStorage.getItem("user_name")
    document.querySelector('#user_picture').setAttribute("src", localStorage.getItem("user_picture")) 
    document.querySelector('#menu-user').style.display = "block"

    window.getLocation = setInterval(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            socket.emit("fleet-location", {latitude: position.coords.latitude, longitude: position.coords.longitude});    
        })
    }, 1000)
}

const createorUpdateFleet = async (data) =>
{
    const {sub, name, email, picture} = data

    const orderCreated = await axios({
        method: "post",
        data: {name: name, email: email, picture: picture, google_id: sub, socket_id: socket.id},
        url: "http://localhost:3000/fleet/login",
    });

    console.log(orderCreated)
}

window.onSignIn = (user) =>
{
    user = decodeJWT(user.credential)

    localStorage.setItem("user_id", user.sub)
    localStorage.setItem("user_name", user.name)
    localStorage.setItem("user_email", user.email)
    localStorage.setItem("user_picture", user.picture)

    createorUpdateFleet(user)
    showUserAndCollectLocation()
}

window.onSignOut = () =>
{
    localStorage.removeItem("user_id")
    localStorage.removeItem("user_name")
    localStorage.removeItem("user_email")
    localStorage.removeItem("user_picture")

    document.querySelector('#user_name').textContent = ""
    document.querySelector('#user_picture').setAttribute("src", "") 
    document.querySelector('#menu-user').style.display = "none"

    clearInterval(window.getLocation);
}

export {renderMenu}