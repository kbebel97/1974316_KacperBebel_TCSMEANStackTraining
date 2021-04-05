let obj = require("readline-sync");
let fs = require("fs");

let records = [];

function loadLog(){
    var data = fs.readFileSync("log.json");
    data = data.toString();
    if(data){
        records = JSON.parse(data);
    }
    return records;
}

function saveLog(){
    loadLog();
    let id = records.length;
    let fName = obj.question("What is the first name? ");
    let lName = obj.question("What is the last name? ");
    var date = new Date();

    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    debugger;

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    debugger;

    var isMorning = true;
    if(hours > 12){
        isMorning = false;
        hours = hours - 12;
    }
    var time = hours + " : " + minutes + " : " + seconds + " " + (isMorning ? "am" : "pm");

    debugger;
    
    date = mm + ' / ' + dd + ' / ' + yyyy;
    let record = {};
    record.id = id;
    record.fName = fName;
    record.lName = lName;
    record.date = date;
    record.time = time;
    records.push(record);
    let recordsJson = JSON.stringify(records);
    fs.writeFileSync("log.json", recordsJson);
    console.log("Record has been stored successfully!");
}

module.exports = {saveLog};

