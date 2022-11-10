console.log("Funcionando");

const socketCliente = io();

const chatContainer = document.getElementById("chatContainer");

socketCliente.on("messagesChat", (data) =>{
console.log(data);
let message = "";
data.forEach(Element=>{
    message +=  `<p>Autor: ${Element.author} - mensage: ${Element.text}</p>`
});
chatContainer.innerHTML = message;
})


//capturar el nombre del usuario

let user = ""
Swal.fire({
    title: "Bienvenido",
    text: "Ingresa tu nombre del usuario",
    input: "text",
    AllowOutsideClick : false
}).then(responense => {
    console.log(responense);
    user = responense.value;
    document.getElementById("userName").innerHTML=  "Estas conectado como "+ user;
})
//Enviar msj al serviro

const chatForm = document.getElementById("chatForm");
chatForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    console.log("Mensaje Enviado")
    console.log(user);
    const message = {
        author: user ,
        text : document.getElementById("chat").value 
       }
       
       console.log(message.value);
       socketCliente.emit("newMsg", message);
})
