const routes = require("express").Router();

const CartsController = require("../controllers/CartsController");
const UserController = require("../controllers/UserController");
const ProductsController = require("../controllers/ProductsController");
const OrderController = require("../controllers/OrderController");
const payment = require("../controllers/PaymentController");

//CARTS
routes.get("/carts", CartsController.index);
routes.post("/carts-create", CartsController.create);
routes.put("/carts-update", CartsController.update);
routes.delete("/carts-deleted", CartsController.destroy);


//USER
routes.post("/registe", UserController.register);
routes.post("/login", UserController.login);


//PRODUCTS
routes.get("/products",ProductsController.getProducts);
routes.get("/product-by-category", ProductsController.getProductByCategory);
routes.post("/create", ProductsController.postProducts);
routes.put("/products-update", ProductsController.updatedProduct);
routes.delete("/produts-deleted", ProductsController.deleteProduct);

//ORDER
routes.get("/orders", OrderController.getOrder);
routes.get("/ordersid/:id", OrderController.getOrderId);
routes.post("/create-order", OrderController.postOrder);
routes.put("/updated-order", OrderController.updatedOrder);
routes.delete("/deleteOrder", OrderController.deleteOrder);

//PAYMENT
routes.post("/payment", payment.postPayment);


module.exports = routes 