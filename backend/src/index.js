import express from 'express'
import cors from 'cors'
import { connectDB } from './lib/connectDb.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import slotRouter from './routes/slot.route.js';
const port = process.env.PORT || 3000

const app = express();

// middleware 
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/slots', slotRouter);

const startServer = async ()=>{
try{
    await connectDB()
    app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
} catch(error){
    console.log("Error",error)
    process.exit(1)
}
}
startServer()


