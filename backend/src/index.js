import express from 'express'
import dotenv from 'dotenv'
import  dbConnection  from './db/index.db.js';
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import messageRouter from './routes/message.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express();
dotenv.config({path : "./env"});

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))

//Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/message",messageRouter);

const port = process.env.PORT || 4080;
dbConnection()
.then(
    app.listen(port, ()=>{
        console.log(`app running on port http://localhost:${port}`)
    })
).catch((error)=>console.log(error))