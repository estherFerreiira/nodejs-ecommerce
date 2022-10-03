const Cart = require ("../models/Cart");


const index = async(req, res)=>{
    try {
        const carts = await Cart.find();
            return res.status(200).json(carts)
    } catch (error) {
            return res.status(500).json(error);
    }
}

const create = async(req, res)=>{
    try {
        const newCart = new Cart(req.body);
        const savedCart = await newCart.save();
            return  res.status(200).json(savedCart);
    } catch(error){
            return   res.status(500).json(error);
    }
}

const update = async(req, res)=>{
    try {
        const {id} = req.params;
        const {code, price} = req.body;
        const cart = await Cart.findById(id);

        if(!cart) {
            return res.status(404).json()
        }
        await cart.updateOne({code, price});

            return res.status(200).json();
    } catch (error) {
            return res.status(500).json(error);
    }
}

const destroy = async(req, res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
            return res.status(200).json({message: "Cart has been delete"})
    } catch (error) {
            return res.status(500).json(error);
    }
}

module.exports = {index, create, update, destroy};