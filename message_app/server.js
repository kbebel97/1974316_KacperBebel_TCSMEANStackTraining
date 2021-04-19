let obj = require("mongoose"); // load the module
obj.promise = global.Promise;   //creating the reference 
let url = "mongodb://localhost:27017/meanstack";
const mongooseDbOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

let messageSchema = obj.Schema({
    _id : String,
    username : String,
    msg: String,
});

const path = require('path');
const http = require('http');
const express = require("express");
const socketio = require('socket.io');
const formatMessage = require('./util/messages')
const { userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./util/users');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = "Admin"
//Set static folder
app.use(express.static(path.join(__dirname, 'html_css')));
// Run when a client connects 
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room}) => {
        console.log(room);
        const user = userJoin(socket.id, username, room);
        socket.join(user.room);
        // Welcome new user
        socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));
        
        // Broadcast when a user connects
        socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat!`));

        // Send users and room info 
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });

    //Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);
        obj.connect(url, mongooseDbOption); //ready to connect
        let db = obj.connection; // connected to database
        db.on("error", (err)=> console.log(err));
        db.once("open", ()=> {
            let msg_ = obj.model("Msg", messageSchema);
            let msg_1 = new msg_({_id : user.id, username : user.username, msg : msg});
            msg_1.save().then((result)=> {
                console.log(result);
                obj.disconnect();
            })
        })
        io.to(user.room).emit('message', formatMessage(user.username, msg));
        console.log(msg);
    })
    
    // Runs when client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });

        }
    });
});

const PORT = 3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));