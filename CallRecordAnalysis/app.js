let obj = require("mongoose"); // load the module
let fs = require("fs");
obj.promise = global.Promise;   //creating the reference 
let url = "mongodb://localhost:27017/meanstack";
const mongooseDbOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
obj.connect(url, mongooseDbOption); //ready to connect
let db = obj.connection; // connected to database
db.on("error", (err)=> console.log(err));
let callLog = [];
db.once("open", ()=> {

let CallSchema = obj.Schema({
    _id : Number,
    source : Number,
    destination: Number,
    sourceLocation: String,
    destinationLocation: String,
    callDuration: String,
    roaming: String,
    callCharge: Number
});

let Call = obj.model("Call", CallSchema);

var data = fs.readFileSync("CallData.json");
data = data.toString();
if(data){
    callLog = JSON.parse(data);
}

callLog.forEach(call => {
    let call_ = new Call({ _id: call._id, source: call.source, destination: call.destination, sourceLocation: call.sourceLocation, destinationLocation: call.destinationLocation, callDuration: call.callDuration, roaming: call.roaming, callCharge: call.callCharge});
    call_.save((err, result) => {
        if(!err){
            console.log("call inserted successfully: " + call_)
        } else {
            console.log(err);
        }
        obj.disconnect(); // closed the connection
    })
});
})
