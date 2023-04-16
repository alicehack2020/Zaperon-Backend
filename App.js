
import express from "express";
import cors from "cors"
import userRoutes from "./routes/userRoutes.js"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectDb from "./config/connectdb.js"

dotenv.config()

const app = express();
app.use(bodyParser.json())
app.use(cookieParser());
const database_url=process.env.DATABASE_URL;  
//database connection
connectDb(database_url)

app.use(cors())


//user login
app.use("/auth", userRoutes);


 
 


app.get("/", (req, res) => {
    res.send({message:"Welcome"})
})
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
