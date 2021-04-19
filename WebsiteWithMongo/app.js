let obj = require("mongoose"); // load the module
let fs = require("fs"); // json file read / write
let path = require("path");
let express = require("express");
let bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}))

obj.promise = global.Promise;   //creating the reference 
let url = "mongodb://localhost:27017/meanstack";
const mongooseDbOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

let courseSchema = obj.Schema({
    _id : Number,
    name : String,
    description: String,
    amount: Number
});

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html");
})

app.post("/add", (req, res) => {
    res.setHeader("content-type","text/html");
    if(req.body.Id != '' && req.body.Name != '' && req.body.Description != '' && req.body.Amount != ''){
        obj.connect(url, mongooseDbOption); //ready to connect
        let db = obj.connection; // connected to database
        db.on("error", (err)=> console.log(err));
        db.once("open", ()=> {
            let course = obj.model("Course", courseSchema);
            course.find({_id: req.body.Id}).then((document)=> {
                if(document.length == 0){                 
                    let Course = obj.model("Course", courseSchema);
                    let course = new Course({_id: req.body.Id, name: req.body.Name, description: req.body.Description, amount: req.body.Amount})
                    course.save().then(()=> {
                        obj.disconnect(); // closed the connection
                        res.sendFile(__dirname+"/public/add_course.html");
                    })
                } else {
                    obj.disconnect(); // closed the connection
                    res.write(`<html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Add</title>
                        <link rel="stylesheet" href="../css/add_course.css">
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                    </head>
                    <body  style="background-color: #0275d8;">    
                        <div style="display: flex; justify-content: flex-start; align-items: center; height: fit-content; flex-direction: column; margin: 20px; padding: 20px; border: solid black 3px; border-radius: 10px; background-color: seashell;">
                            <div style="display: flex; flex-direction: row; justify-content: flex-start; padding: 5px; width: 100%""><a class="btn btn-primary" href="/index.html">Return</a></div>
                            <div style="display: flex; flex-direction: row; justify-content: center; padding: 5px; width: 100%">
                                <h1 style="margin: 0px">Add Course</h1>
                            </div>
                            <h3>Id is already used</h3>
                            <form action="/add" method="POST" style="display: flex; flex-direction: column; row-gap: .5em;" >
                                <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="ID" name="Id" />
                                <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Name" name="Name"/>
                                <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Description" name="Description"/>
                                <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Amount" name="Amount"/>
                                <div style="display: flex; flex-direction: row; column-gap: .2em;">
                                <input type="submit" style="flex: 1; width: 100%" class="btn btn-primary" value="submit"/>
                                <input type="reset" style="flex: 1; width: 100%" class="btn btn-danger" value="reset"/>
                                </div>
                            </form>
                        </div>
                    </body>
                    </html>`);
                    res.end();
                }
            })
        })
    } else {
        res.write(`<html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Add</title>
            <link rel="stylesheet" href="../css/add_course.css">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        </head>
        <body style="background-color: #0275d8;">    
            <div style="display: flex; justify-content: flex-start; align-items: center; height: fit-content; flex-direction: column; margin: 20px; padding: 20px; border: solid black 3px; border-radius: 10px; background-color: seashell;">
                <div style="display: flex; flex-direction: row; justify-content: flex-start; padding: 5px; width: 100%""><a class="btn btn-primary" href="/index.html">Return</a></div>
                <div style="display: flex; flex-direction: row; justify-content: center; padding: 5px; width: 100%">
                    <h1 style="margin: 0px">Add Course</h1>
                </div>
                <h3>All fields must be filled!</h3>
                <form action="/add" method="POST" style="display: flex; flex-direction: column; row-gap: .5em;" >
                    <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="ID" name="Id" />
                    <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Name" name="Name"/>
                    <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Description" name="Description"/>
                    <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Amount" name="Amount"/>
                    <div style="display: flex; flex-direction: row; column-gap: .2em;">
                    <input type="submit" style="flex: 1; width: 100%" class="btn btn-primary" value="submit"/>
                    <input type="reset" style="flex: 1; width: 100%" class="btn btn-danger" value="reset"/>
                    </div>
                </form>
            </div>
        </body>
        </html>`);
        res.end();
    }
})


app.post("/delete", (req, res) => {
    res.setHeader("content-type","text/html");
    obj.connect(url, mongooseDbOption); //ready to connect
    let db = obj.connection; // connected to database
    db.on("error", (err)=> console.log(err));
    db.once("open", ()=> {
        let course = obj.model("Course", courseSchema);
        course.deleteOne({_id: req.body.Id}).then(result => {
            console.log(result);
            if(result.deletedCount > 0){
                res.sendFile(__dirname+"/public/delete_course.html");
            } else {
                res.write(`
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Add</title>
                    <link rel="stylesheet" href="../css/delete_course.css">
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                </head>
                <body style="background-color: #0275d8;">    
                    <div style="display: flex; justify-content: flex-start; align-items: center; height: fit-content; flex-direction: column; margin: 20px; padding: 20px; border: solid black 3px; border-radius: 10px; background-color: seashell;">
                        <div style="display: flex; flex-direction: row; justify-content: flex-start; padding: 5px; width: 100%""><a class="btn btn-primary" href="/index.html">Return</a></div>
                        <div style="display: flex; flex-direction: row; justify-content: center; padding: 5px; width: 100%">
                            <h1 style="margin: 0px">Delete Course</h1>
                        </div>
                        <h3>ID does not exist</h3>
                        <form action="/delete" method="POST" style="display: flex; flex-direction: column; row-gap: .5em;" >
                            <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="ID" name="Id" />
                            <div style="display: flex; flex-direction: row; column-gap: .2em;">
                            <input type="submit" style="flex: 1; width: 100%" class="btn btn-primary" value="submit"/>
                            <input type="reset" style="flex: 1; width: 100%" class="btn btn-danger" value="reset"/>
                            </div>
                        </form>
                    </div>
                </body>`
            )
                res.end();
            }
            obj.disconnect(); // closed the connection
            res.sendFile(__dirname+"/public/delete_course.html");
        });
    })
    }
)

app.get("/read", (req, res) => {
    obj.connect(url, mongooseDbOption); //ready to connect
    let db = obj.connection; // connected to database
    db.on("error", (err)=> console.log(err));
    db.once("open", ()=> {
        let course = obj.model("Course", courseSchema);
        course.find({}, (err, result) => {
            if(!err){
                 result;
            }
            obj.disconnect();
            return result
        }).then((result)=> {
            res.setHeader("content-type","text/html"); 
            res.write(`
            <html style="height: 100%">
                <head>
                <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
                crossorigin="anonymous"
                />
                </head>
                <body  style="background-color: #0275d8;">    
                <div style="display: flex; justify-content: flex-start; align-items: center; padding: 20px; height: fit-content; flex-direction: column; margin: 20px; border: solid black 3px; border-radius: 10px; background-color: seashell;">
                    <div style="display: flex; flex-direction: row; justify-content: flex-start; padding: 5px; width: 100%""><a class="btn btn-primary" href="/index.html">Return</a></div>
                    <div style="display: flex; flex-direction: row; justify-content: center; padding: 5px; width: 100%">
                        <h1 style="margin: 0px">Course View</h1>
                    </div>
                    <div style="flex: 1; width: 100%; padding: 20px;">
                        <table style="width : 100%">
                            <thead>
                                <tr style="display: flex; flex-direction: row">
                                    <th style="text-align: center; flex : 1">ID</th>
                                    <th style="text-align: center; flex : 1">Name</th>
                                    <th style="text-align: center; flex : 1">Description</th>
                                    <th style="text-align: center; flex : 1">Amount</th>
                                </tr>
                            </thead>
                            <tbody id="tbody" style="display: flex; flex-direction: column;">
                            ${result.map((c) => 
                                `<tr style="display: flex; flex-direction: row; padding-top: 5px; padding-bottom: 5px">
                                <td style="text-align: center; flex : 1">${c._id}</td>
                                <td style="text-align: center; flex : 1">${c.name}</td>
                                <td style="text-align: center; flex : 1">${c.description}</td>
                                <td style="text-align: center; flex : 1">${c.amount}</td>
                                </tr>`
                            ).join('\n')} 
                            </tbody>
                        </table>
                    <div>
                </div>
            </body>
            </html>
            `);
            res.end()
        })
    })
})

app.post("/update", (req, res) => {
    if(req.body.Id != '' && req.body.Name != '' && req.body.Description != '' && req.body.Amount != ''){
        obj.connect(url, mongooseDbOption); //ready to connect
        let db = obj.connection; // connected to database
        db.on("error", (err)=> console.log(err));
        db.once("open", ()=> {
            let course = obj.model("Course", courseSchema);
            const course_ = new course({
                _id: req.body.Id,
                name: req.body.Name,
                description: req.body.Description,
                amount: req.body.Amount
            });
            course.updateOne({_id: req.body.Id}, course_).then(result => {
                console.log(result);
                obj.disconnect(); // closed the connection
                if(result.nModified > 0){
                    res.sendFile(__dirname+"/public/update_course.html");
                } else {
                    res.setHeader("content-type","text/html"); 
                      obj.connect(url, mongooseDbOption); //ready to connect
    let db = obj.connection; // connected to database
    db.on("error", (err)=> console.log(err));
    db.once("open", ()=> {
        let course = obj.model("Course", courseSchema);
        const course_ = new course({
            _id: req.body.Id,
            name: req.body.Name,
            description: req.body.Description,
            amount: req.body.Amount
        });
        course.updateOne({_id: req.body.Id}, course_).then(result => {
            console.log(result);
            obj.disconnect(); // closed the connection
            if(result.nModified > 0){
                res.sendFile(__dirname+"/public/update_course.html");
            } else {
                res.setHeader("content-type","text/html"); 
                res.write(`
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Add</title>
                    <link rel="stylesheet" href="../css/add_course.css">
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
                </head>
                <body  style="background-color: #0275d8;">    
                    <div style="display: flex; justify-content: flex-start; align-items: center; height: fit-content; flex-direction: column; margin: 20px; padding: 20px; border: solid black 3px; border-radius: 10px; background-color: seashell;">
                        <div style="display: flex; flex-direction: row; justify-content: flex-start; padding: 5px; width: 100%"><a class="btn btn-primary" href="/index.html">Return</a></div>
                        <div style="display: flex; flex-direction: row; justify-content: center; padding: 5px; width: 100%">
                            <h1 style="margin: 0px">Update Course</h1>
                        </div>
                        <h3>ID does not exist</h3>
                        <form action="/update" method="POST" style="display: flex; flex-direction: column; row-gap: .5em;" >
                            <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="ID" name="Id" />
                            <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Name" name="Name"/>
                            <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Description" name="Description"/>
                            <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Amount" name="Amount"/>
                            <div style="display: flex; flex-direction: row; column-gap: .2em;">
                            <input type="submit" style="flex: 1; width: 100%" class="btn btn-primary" value="update"/>
                            <input type="reset" style="flex: 1; width: 100%" class="btn btn-danger" value="reset"/>
                            </div>
                        </form>
                    </div>
                </body>
                </html>
                `);
                res.end()
            }
        });
    });
                }
            });
        });

    } else {
        res.write(`
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Add</title>
            <link rel="stylesheet" href="../css/add_course.css">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        </head>
        <body  style="background-color: #0275d8;">    
            <div style="display: flex; justify-content: flex-start; align-items: center; height: fit-content; flex-direction: column; margin: 20px; padding: 20px; border: solid black 3px; border-radius: 10px; background-color: seashell;">
                <div style="display: flex; flex-direction: row; justify-content: flex-start; padding: 5px; width: 100%"><a class="btn btn-primary" href="/index.html">Return</a></div>
                <div style="display: flex; flex-direction: row; justify-content: center; padding: 5px; width: 100%">
                    <h1 style="margin: 0px">Update Course</h1>
                </div>
                <h3>All fields must be filled!</h3>
                <form action="/update" method="POST" style="display: flex; flex-direction: column; row-gap: .5em;" >
                    <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="ID" name="Id" />
                    <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Name" name="Name"/>
                    <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Description" name="Description"/>
                    <input type="text" style="font-size: 2em; border: 1px solid black; border-radius: 10px;" placeholder="Amount" name="Amount"/>
                    <div style="display: flex; flex-direction: row; column-gap: .2em;">
                    <input type="submit" style="flex: 1; width: 100%" class="btn btn-primary" value="update"/>
                    <input type="reset" style="flex: 1; width: 100%" class="btn btn-danger" value="reset"/>
                    </div>
                </form>
            </div>
        </body>
        </html>
        `);
        res.end()
    }

})


const PORT = 9000 || process.env.PORT;
app.listen(PORT, ()=>console.log("running on port: " + PORT))