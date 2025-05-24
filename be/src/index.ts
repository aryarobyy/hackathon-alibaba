import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { createServer } from "http";
import chatRoute from './routes/chat.route';
import userRoute from './routes/user.route';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/chat', chatRoute)
app.use('/user', userRoute)

httpServer.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});