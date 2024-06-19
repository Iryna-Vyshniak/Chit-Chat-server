import { Server } from 'socket.io';
import http from 'http'; // it`s from node.js
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET","POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    }
});

export {app, io, server};