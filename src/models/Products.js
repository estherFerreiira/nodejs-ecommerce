const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title:{
            type: String
           
        },
        description: {
            type: String,
            required: true
        },
        images: {
            type: String,
            required: true
        },
        category: {
            type: Array
        },
        size: {
            type: Array
        },
        price: {
            type: Number,
            required: true
        },
        inStock: {
            type: String,
            default: true
        }

    },
     {timenstamps: true}
)
module.exports = mongoose.model("Products", productSchema);