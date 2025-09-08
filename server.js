const dotenv = require("dotenv")
const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const port = 5000;
const cors = require("cors");


dotenv.config()
const userRoutes = require("./routes/userRouter")
//middlewares
app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.send("Server is running")
})
app.use("/api/user", userRoutes)


const startServer = async ()=>{
    try {
        await mongoose.connect(process.env.mongo_url)
        console.log("MongoDB connected")

        const port = process.env.PORT;
        app.listen(port, ()=>{
            console.log(`server running on : ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
startServer() 