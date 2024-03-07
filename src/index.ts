require('dotenv').config({
  path: './env/.env.dev',
});

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { user } from './socket';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'], // Allow your Next.js app domain
    methods: ['GET', 'POST'], // Allowable methods
    credentials: true, // Allow credentials
  },
});

const userNameSpace = io.of('/user');
const partnerNameSpace = io.of('/partner');
user(userNameSpace);
user(partnerNameSpace);

app.get('/', (req, res) => {
  res.send('Hey Sonu Testing 123 🚀');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

const PORT = 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
