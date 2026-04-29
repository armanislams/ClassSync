import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { connectDB } from './lib/connectDb.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import slotRouter from './routes/slot.route.js';
const port = process.env.PORT || 3000

const app = express();

// middleware 
app.use(express.json())

const allowedOrigins = [
    process.env.Live_url,
  "http://localhost:5173",
  "https://classsync-zeta.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

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

export default app;
