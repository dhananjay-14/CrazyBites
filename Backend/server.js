import express from "express"
import cors from "cors"
import 'dotenv/config.js'
import { connectdb } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";

import orderRouter from "./routes/orderRoutes.js";

// app config 
const app = express();
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())

//db connect
connectdb();

//api endpoint
app.use('/api/food', foodRouter);

//uploads folder can be accessed on /images route
// we can say that we have exposed our uploads folder at this endpoint. now frontend can use this endpoint to show the image
app.use('/images', express.static("uploads"));

app.use('/api/user', userRouter);

app.use('/api/order', orderRouter)

app.get("/", (req, res) => {
    res.send("API working")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

