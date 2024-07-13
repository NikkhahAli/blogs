import { app } from "./app.js"
import dotenv from "dotenv"
import { __dirname } from "./app.js"
import mongoose from "mongoose"

dotenv.config({path : `${__dirname}/config.env`})

const port = process.env?.PORT || 8000 

try {
    await mongoose.connect(process.env?.DATABASE_PATH)
    console.log("database connected ✅")
} catch (err) {
    console.log(err)
}


app.listen(port , () =>{
    console.log(`Server is loading on port ${port}`)
})