import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { createServer } from "http";
import chatRoute from './routes/chat.route';
import userRoute from './routes/user.route';
// import { insertManyData } from './controller/insert.many';
import cors from 'cors';
import { getFoodByMood } from './controller/food.controller';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// insertManyData();

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    credentials: true, 
  })
);

// insertManyData();
app.use('/chat', chatRoute)
app.use('/user', userRoute)
app.use('/food', getFoodByMood)

httpServer.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})