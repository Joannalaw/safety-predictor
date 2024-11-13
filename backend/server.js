import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js";
import postRoutes from './routes/post.route.js'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use("/api/posts", postRoutes )
app.get('/users', (req, res) => {
    res.send('')
})
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started running at port ${PORT}...`)
})
