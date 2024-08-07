const express = require('express');
const WebSocket = require('ws');

const app = express();
const wss = new WebSocket.Server({ port: 8080});

wss. on('connection', (ws) => {
    console.log('A new client connected.');
    ws.on('message', (message) => {
        console.log('Received message:', message.toString());
        wss.clients.forEach((clients) => {
            if (clients.readyState === WebSocket.OPEN) {
                clients.send(message.toString());
            }
        });
    });
    ws.on('close', () => {
        console.log('A client disconnected.');
    });
});