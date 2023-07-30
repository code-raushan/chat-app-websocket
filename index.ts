import dotenv from 'dotenv'
dotenv.config()
import express, { Express, Request, Response } from "express";
import { connectToDB } from './config/db';
const socketio = require('socket.io')
import http from 'http'
import path from 'path'


const app:Express = express();

app.set('view engine', 'ejs');
app.get('/', (req:Request, res:Response)=>{
    res.render('index')
})

const server = http.createServer(app)
const io = socketio(server);

io.on('connection', (socket: any)=>{
    socket.on('join_room', (data: {roomId: 'string'})=>{
        console.log("Joined a room", data.roomId);
        socket.join(data.roomId);

    });

    socket.on('msg_send', async(data: {msg: string, username: string, roomId: string})=>{
        console.log("data", data);
        io.to(data.roomId).emit('msg_rcvd', data)
    });
});



app.get('/chat/:roomId', async(req:Request, res:Response)=>{
    res.render('chat', {
        id: req.params.roomId
    })
})

server.listen(5555, ()=>{
    console.log(`Server started at http://localhost:5555`);
    connectToDB();
})




