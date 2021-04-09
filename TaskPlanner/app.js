let fs = require("fs");
let http = require("http");
let url = require("url");
let port = 9999;

let tasks = [];

let main = `
<html style="height: 100%">
    <head>
    <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
    crossorigin="anonymous"
    />
    </head>
    <body style="height: 100%;">
        <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
            <div style="flex: 1; padding: 10px; border-bottom: 5px solid black; width: 100%">
                <h1>Add Task</h1>
                <form action="/store" method="get" style="display: flex; flex-direction: column; row-gap: .5em;" >
                    <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Emp ID" name="empId" />
                    <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Task ID" name="taskId"/>
                    <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Task" name="task"/>
                    <input type="date" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Date" name="date"/>
                    <div style="display: flex; flex-direction: row; column-gap: .2em;">
                    <input type="submit" style="flex: 1; width: 100%" class="btn btn-primary" value="submit"/>
                    <input type="reset" style="flex: 1; width: 100%" class="btn btn-danger" value="reset"/>
                    </div>
                </form>
            </div>
            <div style="flex: 1; padding: 10px; border-bottom: 5px solid black; width: 100%">
                <h1>Delete Task</h1>
                <form action="/delete" method="get" style="display: flex; flex-direction: column; row-gap: .5em;" >
                    <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Task ID" name="taskId"/>
                    <div style="display: flex; flex-direction: row; column-gap: .2em;">
                    <input type="submit" style="flex: 1; width: 100%" class="btn btn-primary" value="Delete"/>
                    </div>
                </form>
            </div>
            <div style="flex: 1; padding: 10px; width: 100%">
                <h1>Display Tasks</h1>
                <button class="btn btn-primary"onclick="location.href='http://localhost:9999/display'" type="button">Display Tasks</button>
            </div>
        </div>
    </body>
</html>
`

let main_with_display = `
<html style="height: 100%">
    <head>
    <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
    crossorigin="anonymous"
    />
    </head>
    <body style="height: 100%;">
        <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
            <div style="flex: 1; padding: 10px; border-bottom: 5px solid black; width: 100%">
                <h1>Add Task</h1>
                <form action="/store" method="get" style="display: flex; flex-direction: column; row-gap: .5em;" >
                    <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Emp ID" name="empId" />
                    <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Task ID" name="taskId"/>
                    <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Task" name="task"/>
                    <input type="date" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Date" name="date"/>
                    <div style="display: flex; flex-direction: row; column-gap: .2em;">
                    <input type="submit" style="flex: 1; width: 100%" class="btn btn-primary" value="submit"/>
                    <input type="reset" style="flex: 1; width: 100%" class="btn btn-danger" value="reset"/>
                    </div>
                </form>
            </div>
            <div style="flex: 1; padding: 10px; border-bottom: 5px solid black; width: 100%">
                <h1>Delete Task</h1>
                <form action="/delete" method="get" style="display: flex; flex-direction: column; row-gap: .5em;" >
                    <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Task ID" name="taskId"/>
                    <div style="display: flex; flex-direction: row; column-gap: .2em;">
                    <input type="submit" style="flex: 1; width: 100%" class="btn btn-primary" value="Delete"/>
                    </div>
                </form>
            </div>
            <div style="flex: 1; padding: 10px; width: 100%">
                <table style="width : 100%">
                    <thead>
                        <tr style="display: flex; flex-direction: row">
                            <th style="text-align: center; flex : 1">Emp ID</th>
                            <th style="text-align: center; flex : 1">Task ID</th>
                            <th style="text-align: center; flex : 1">Task</th>
                            <th style="text-align: center; flex : 1">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${loadTaskView()} 
                    </tbody>
                </table>
            <div>
        </div>
    </body>
</html>
`

let error = `
<html style="height: 100%">
    <head>
    <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
    crossorigin="anonymous"
    />
    </head>
    <body style="height: 100%;">
        <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
            <div style="padding: 10px; width: 100%">
                <h1>Error has occurred. Task already exists!</h1>
                <div style="display: flex; flex-direction: column; row-gap: .5em; justify-content: center; align-items: center; width: 100%" >
                    <button class="btn btn-primary"onclick="location.href='http://localhost:9999/'"  style="width: 100%" type="button">Return</button>
                </div>
            </div>
        </div>
    </body>
</html>
`
let server = http.createServer((req,res)=> {
    //console.log(url.parse(req.url,true))
    var pathInfo = url.parse(req.url,true).pathname;
    if(req.url=="/"){
    res.setHeader("content-type","text/html");  // by default data consider as a html 
    res.end(main);
    }else if(pathInfo=="/store"){
    var data = url.parse(req.url,true).query; 
        if(saveTask(data)){
            res.setHeader("content-type","text/html");  // by default data consider as a html 
            res.end(main);
        } else {
            res.setHeader("content-type","text/html");  // by default data consider as a html 
            res.end(error);
        }
    } else if(pathInfo=="/display"){
        loadTasks();
        console.log(tasks);
        res.setHeader("content-type","text/html");  // by default data consider as a html 
        res.end(main_with_display);
    } else if(pathInfo=="/delete"){
        var data = url.parse(req.url,true).query;
        console.log(data.taskId);
        deleteTask(data.taskId);
        res.setHeader("content-type","text/html");  // by default data consider as a html 
        res.end(main);
    }
})
server.listen(port,()=>console.log(`running on port num ${port}`));

function loadTasks(){
    var data = fs.readFileSync("tasks.json");
    data = data.toString();
    if(data){
        tasks = JSON.parse(data);
    }
    return tasks;
}

function loadTaskView(){
    let view = '';
    loadTasks();
     tasks.map(task => {
        let a = `<tr style="display: flex; flex-direction: row">
            <td style="text-align: center; flex : 1">${task.empId}</td>
            <td style="text-align: center; flex : 1">${task.taskId}</td>
            <td style="text-align: center; flex : 1">${task.task}</td>
            <td style="text-align: center; flex : 1">${task.date}</td>
         </tr>`
         view = view + a; 
        }
    )
    return view;
    

}

function saveTask(data){
    loadTasks();
    for(let i = 0; i < tasks.length; i++){
        if(data.taskId == tasks[i].taskId){
            return false;
        }
    }
    let task = {}
    task.empId = data.empId;
    task.taskId = data.taskId;
    task.task = data.task;
    task.date = data.date;
    tasks.push(task);
    let tasksJson = JSON.stringify(tasks);
    fs.writeFileSync("tasks.json", tasksJson);
    console.log("Task has been stored successfully!");
    return true;
}

function deleteTask(taskId){
    loadTasks();
    for(let i  = 0; i < tasks.length; i++){
        if(tasks[i].taskId == taskId){
            tasks.splice(i, 1);
        }
    }
    let tasksJson = JSON.stringify(tasks);
    fs.writeFileSync("tasks.json", tasksJson);
    console.log("Task has been deleted!");

}