require('dotenv').config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const userRoute = require("./routes/userRoutes");
const noteRoute = require("./routes/notesRoutes");
app.use(express.json())

const mongoose = require("mongoose");

app.use("/api/users",userRoute);
app.use("/api/notes",noteRoute);


app.get("/test",(req,res) => {
    res.send("Hello World")
});

mongoose
.connect(process.env.MDR_STR)
.then(() => {
    console.log("Connected Sucessfully MongoDb Database...!")
    app.listen(PORT, () => {
        console.log("Hello Terminal "+ PORT)
       
    })   
})
.catch((error) => {
    console.log(error)
})



