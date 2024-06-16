const express = require("express")
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
const productRoute = require("./routes/productRoutes")
const errorMiddleware = require("./middleware/errorMiddleware")

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api/products', productRoute);
app.use(errorMiddleware) //to make error message more secure

app.get('/', (req, res) => {
    // throw new Error("Fake error");
    res.send("Hello Node api")
})

//cross origin url access
const frontend = process.env.frontend;

var corsOptions = {
    origin: frontend,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions)); //solve allow cross platform origin access problem


//mongodb connection
const uri = process.env.mongo_url;
const port = process.env.mongo_port;

mongoose.connect(uri)
    .then(() => {
        console.log("Connected to mongodb")

        //first will be connected to mongodb database and the application will start
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`)
        })
    })
    .catch(() => {
        console.log(error)
    })