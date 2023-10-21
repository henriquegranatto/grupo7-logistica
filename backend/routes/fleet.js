var express = require('express');
var router = express.Router();
const {Order} = require("../repository/order");
const {Fleet} = require("../repository/fleet");

router.get('/orders/:fleet', async function(request, response, next) {
    response.status(200).send(await Order.findAll({ where: {fleet: request.params.fleet} }))
});

router.get('/', async function(request, response, next) {
    response.status(200).send(await Fleet.findAll())
});

router.post('/', async function(request, response, next) {
    response.status(200).send(await Fleet.create({
        name: request.body.name,
        google_id: request.body.google_id,
        socket_id: request.body.socket_id,
    }))
});

module.exports = router;