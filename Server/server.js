import express from 'express';
import cors from 'cors';
import http from 'http';
import "dotenv/config"
import { connectDB } from './lib/db.js';
import userRouter from './Routes/userRoute.js';
import msgRouter from './Routes/msgRoute.js';
import { Server } from 'socket.io';


// Express app and HTTP Server
const app = express();
const server = http.createServer(app); // socket.io support this server

// Initialize socket.io Server
export const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

// Store Online Users
export const userSocketMap = {}; // { userId : socketId }

// Socket.io Connection
io.on("connection", (socket) => {

  const userId = socket.handshake.query.userId;
  console.log("User Connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  // Emit Online Users To All Connected Clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("User Disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
  
});


// MiddleWare
app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ extended: false }));


app.use(cors());

// Route setup
app.use('/api/status', (req, res) => res.send("server is live"))
app.use('/api/auth', userRouter);
app.use('/api/messages', msgRouter);

// connected to mongoDB
await connectDB()

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));