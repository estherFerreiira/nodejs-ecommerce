const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./src/routes/routes");
const dotenv = require("dotenv");
dotenv.config();

mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=> console.log("DB Conncection Successfull"))
    .catch((err)=> {
        console.log(err)
});

app.listen(process.env.PORT || 5000,()=>{
    console.log("Backend server is runnig!")
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/api",routes);