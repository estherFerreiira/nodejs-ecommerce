const Order = require("../models/Order");



const getOrder = async(req, res)=> {
    try {
        const order = await Order.find();
        return res.status(200).json(order);

    } catch (error) {
        return res.status(500).json(error);
    }
}

const getOrderId = async(req, res)=> {
    try {
        const order = await Order.find({
            user: req.params.user
        });
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json(error)
    }
}

const postOrder = async(req, res)=> {
    const {shippingInfo, orderInfo, totalPrice} = req.body
    
    const newOrder = new Order({
        shippingInfo,
        orderInfo,
        totalPrice,
    });
    try {
        await newOrder.save();
        return res.status(200).json(newOrder);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const updatedOrder = async(req, res)=> {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        );
            return res.status(200).json(order)

    } catch (error) {
            return re.status(500).json(error);
    }
}

const deleteOrder = async(req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Order has been deleted"})
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { getOrder, getOrderId, postOrder, updatedOrder, deleteOrder}