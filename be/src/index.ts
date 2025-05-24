import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { createServer } from "http";
// import { Server } from "socket.io";
import path from 'path';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3000;

app.use(express.json());

// const io = new Server(httpServer, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"]
//     },
//     connectionStateRecovery: {}
// });

// initSocket(io);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// app.use(express.static(path.join(__dirname, "public")));

httpServer.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});