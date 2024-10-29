import dotenv from "dotenv";
dotenv.config();
import connectToDatabase from "./database/connect.js";
import authRoute from "./routes/auth.route.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
import express from "express";
const app = express();
import morgan from "morgan";
const PORT = process.env.PORT || 3000;

//middleware to parse json payload
app.use(express.json({ limit: "30mb" }));

//middleware to parse urlencoded payload
app.use(express.urlencoded({ extended: false }))

//logger
app.use(morgan("dev"));

//authentication route.
app.use("/auth", authRoute);

//middleware
app.use(notFound)
app.use(errorHandler);

const startServer = async (url) => {
    try {
        const { connection: connectionObj } = await connectToDatabase(url);
        const { host, port } = connectionObj
        console.log(`connected to database: [ ${host}:${port} ]`);
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}.Press Ctrl + C to terminate.`)
        })
    } catch (error) {
        console.error(error);
    }
}

startServer(process.env.MONGO_URL_DEV)
