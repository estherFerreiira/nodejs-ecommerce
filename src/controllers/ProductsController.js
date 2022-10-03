const Products = require("../models/Products");


const getProducts = async (req, res) =>{
   
   try {
        const product = await Products.find();
            return  res.status(200).json(product);
   } catch (error) {
            return  res.status(500).json(error);
   }
}

const getProductByCategory = async(req, res)=>{
    const {category} = req.body;
    if(!category){
        return res.json(({error: "filled "}))
    }
    try {
        const products = await Products
          .find({ category: category })
          .populate("category", "cName");
        if (products) {
          return res.status(200).json(products);
        }
    } catch (error) {
        return res.status(500).json(error);
    }

}

const postProducts = async(req, res) => {

    const {title, description, images, category, size, price, inStock} = req.body
    
    const newProduct = new Products({
        title,
        description, 
        images, 
        category, 
        size, 
        price, 
        inStock
    });
    try {
        await newProduct.save();
        return res.status(200).json(newProduct);
    } catch (error) {
        return res.status(500).json(error);
    }

}

const updatedProduct = async(req, res) => {
    try {
        const updatedProduct = await Products.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
        return  res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteProduct = async(req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.id);
        return res.status(200).json("Product has been deleted...")
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {getProducts,getProductByCategory, postProducts, updatedProduct, deleteProduct}