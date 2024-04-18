const socket = io()

let nam;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    nam = prompt('Please Enter your name')
}while(!nam)

textarea.addEventListener('keyup', (e) =>{
if(e.key === 'Enter'){
    // console.log(e.target.value)
    sendMessage(e.target.value)
}
})

function sendMessage(message){
    let msg = {
        user:nam,
        message:message.trim()
    }

    // append
    appendMessage(msg, 'outgoing')
    textarea.value =''
    scrolToBottom()

    // Sending to the server
    socket.emit('message', msg)

}
function appendMessage(msg, type){
    let maindiv= document.createElement('div')
    let className =type
    maindiv.classList.add(className, 'message')

    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    maindiv.innerHTML =markup
    messageArea.appendChild(maindiv)
}

// Reciving Message

socket.on('message', (msg) =>{
    // console.log(msg)
    appendMessage(msg, 'incoming')
    scrolToBottom()
})

function scrolToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}