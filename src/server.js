const express = require('express');
const {Server} = require("socket.io")
const app = express();



const port = process.env.PORT || 8080;
const server = app.listen(port, ()=>console.log( "El server esucha en  " + port)); 

app.use(express.static(__dirname + "/public"));

const io = new Server(server);
const messages = [
    { author: "Juan", text: "¡Hola! ¿Que tal?" },
    { author: "Pedro", text: "¡Muy bien! ¿Y vos?" },
    { author: "Ana", text: "¡Genial!" }
 ];


io.on("connection", (socket)=>{
    console.log("Nuevo cliente conectado")
    socket.emit("messagesChat", messages)
    socket.on("newMsg", (data)=>{
        messages.push(data);
        // Enviamos mensajes a todos los users conectados
        io.sockets.emit("messagesChat", messages )
    })
})