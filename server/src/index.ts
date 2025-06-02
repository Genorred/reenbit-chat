import express from 'express';
import WebSocket from 'ws';
import {errorHandler} from "./middlewares/errorHandling";
// import router from "./routes/router";
import * as mongoose from "mongoose";
import { handleWSNamespaces } from './routes/handleWSNamespaces';
import {NOTFOUND} from "node:dns";
import dotenv from "dotenv";
import router from "./routes/router";
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
const port = process.env.SERVER_PORT || 5000;
app.use(cookieParser());

// Serve static files
app.use(express.static('public'));
app.use(errorHandler);
app.use('/api', router);

// Create HTTP server
(async () => {
    try {
        const mongodbUri = process.env.MONGODB_URI || `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/?directConnection=true`
        await mongoose.connect(mongodbUri);

        const server = app.listen(port, () => {
            console.log(`Server running on http://localhost:${port}`);
        });
        const wss = new WebSocket.Server({
            server,
            host: process.env.HOST,
        });

        wss.on('connection', (ws, req) => {
            const path = req.url;
            if (!path)
                throw new Error(NOTFOUND)

            handleWSNamespaces(path, ws, wss)
        });

    } catch (e) {
        console.log(`Error occurred while starting websocket server: ${e}`);
    }
})()



// function handleChatNamespace(ws) {
//     ws.on('message', (message) => {
//         wss.clients.forEach((client) => {
//             if (client.readyState === WebSocket.OPEN && client.url === '/chat') {
//                 client.send(message);
//             }
//         });
//     });
// }
//
// function handleGameNamespace(ws) {
//     ws.on('message', (message) => {
//         wss.clients.forEach((client) => {
//             if (client.readyState === WebSocket.OPEN && client.url === '/game') {
//                 client.send(message);
//             }
//         });
//     });
// }