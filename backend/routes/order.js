var express = require('express');
var router = express.Router();
const {Fleet} = require("../repository/fleet");
const {Order} = require("../repository/order");

const getOrderFleet = async (order) => await Fleet.findOne({where: {id: order.fleet}})

const getOrders = async (request, response, next) =>
{
    const orderList = await Order.findAll()

    for (let index = 0; index < orderList.length; index++) 
        if(orderList[index].fleet != null && orderList[index].fleet != 0)
            orderList[index].setDataValue("fleet_name", (await getOrderFleet(orderList[index])).name)

    response.status(200).send(orderList)
}

router.get('/', getOrders);

router.post('/', async function(request, response, next) {
    response.status(200).send(await Order.create({
        code: request.body.code,
        origin_address: request.body.origin.address,
        origin_latitude: request.body.origin.latitude,
        origin_longitude: request.body.origin.longitude,
        destiny_address: request.body.destiny.address,
        destiny_latitude: request.body.destiny.latitude,
        destiny_longitude: request.body.destiny.longitude,
    }))
});

router.put('/:id', async function(request, response, next) {
    const orderUpdated = await Order.update(
        {fleet: request.body.fleet}, 
        {where: {id: request.params.id}}
    )

    if(orderUpdated)
        response.status(202).send()
    else
        response.status(400).send()
});

router.delete('/:id', async function(request, response, next) {
    const orderDeleted = await Order.destroy({where: {id: request.params.id}})

    if(orderDeleted)
        response.status(202).send()
    else
        response.status(400).send()
});

module.exports = router;