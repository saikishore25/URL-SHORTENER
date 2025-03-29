
const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv").config();
const urlROUTE = require("./routes/urlRouter.js");
const {connectToMongoDB} = require("./DBConnect.js");
const URL = require("./models/urlSchema.js");
const path = require("path")

const app = express();
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"));

const PORT = process.env.PORT || 3000;

connectToMongoDB(process.env.MONGOURL)
.then(()=>{
    console.log("MongoDB Connected Sucessfully ");

}).catch(()=>{

    console.log("Failed To Connect Database")
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use("/url", urlROUTE);



app.listen(PORT, ()=>{

    console.log(`Listening on Port ${PORT}`);

})
