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

router.post('/login', async function(request, response, next) {
    let [fleet, created] = await Fleet.findOrCreate({
        where: {google_id: request.body.google_id},
        defaults: 
        {
            name: request.body.name,
            email: request.body.email,
            picture: request.body.picture,
            google_id: request.body.google_id,
            socket_id: request.body.socket_id,
        }
    })

    if(created)
        response.status(201).send(fleet.id)
    else
    {
        let fleet = await Fleet.update({
            name: request.body.name,
            email: request.body.email,
            picture: request.body.picture,
            socket_id: request.body.socket_id,
        }, {where: {google_id: request.body.google_id}});

        response.status(201).send(fleet.id)
    }
});

module.exports = router;