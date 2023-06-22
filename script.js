const socket = io("https://fateh-live-chat.glitch.me");
var userName = prompt("what is your name?");
appendMessage("You Joined")
socket.on("chat-message", (message,userName)=>{
   appendMessage(userName+" : "+message);
});
socket.emit("user-added",userName);
socket.on('user-joined',userName=>{
    appendMessage(`${userName} Joined`)
});
socket.on("disconnected",userName=>{
    appendMessage(userName+" left")
})
function appendMessage(message){
    const messageContainer = document.getElementById("message-container");
    const messageDiv = document.createElement("div");
    messageDiv.innerText = message;
    messageContainer.append(messageDiv);
}
const messageForm = document.getElementById("send-container");
const sendBtn = document.getElementById("send-button");
const messageInput = document.getElementById("message-input");
sendBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    message = messageInput.value;
    appendMessage("You : "+message);
    socket.emit('send-chat-message',message,userName);
    messageInput.value = '';
});