const socket = io()

socket.on('message' , (message) => {
    console.log(message)
    
})

document.querySelector('#message-form').addEventListener('submit' ,(e) => {
    e.preventDefault()
    
    const message = e.target.elements.dataEntry.value

    socket.emit('sendMessage' , message ,(msg) => {
        console.log('Message was delivered!', msg)
    })
})

document.querySelector('#send-location').addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert("Geolocation is not supported by this browser.")
    }
    navigator.geolocation.getCurrentPosition((showPosition)=>{
 

        socket.emit('sendLocation' , {
            latitude:showPosition.coords.latitude,
            longitude:showPosition.coords.longitude
        })
    });
})


