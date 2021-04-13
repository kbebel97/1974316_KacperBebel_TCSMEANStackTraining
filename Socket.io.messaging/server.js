let app = require("express")(); // npm install express
let http = require("http").Server(app); // to load the library we have run port number using http module
let io = require("socket.io")(http); //npm install socket.io

app.get("/", (req,res) => {
    res.sendFile(__dirname+"/index.html");
})

io.on("connection",(socket)=> {
    console.log("Client connected to application.....")

    socket.on("chat message", (msg) => {
        socket.emit("chat message");
        console.log(msg);
    })
})

http.listen(9090, ()=> console.log('Server running on port 9090'));