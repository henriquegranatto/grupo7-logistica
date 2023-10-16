var express = require('express');
var router = express.Router();
const {Fleet} = require("../repository/fleet");

router.get('/', async function(request, response, next) {
    response.status(200).send(await Fleet.findAll())
});

router.post('/', async function(request, response, next) {
    response.status(200).send(await Order.create({
        name: request.body.name,
        google_id: request.body.google,
        socket_id: request.body.socket,
    }))
});

module.exports = router;