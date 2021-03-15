function storeInSession(entry) {
    var allEntries = retrieveFromSession();
    if(allEntries){
    allEntries.push(entry)
    sessionStorage.setItem("allEntries", JSON.stringify(allEntries));
    } else {
        var allEntries = [];
        allEntries.push(entry);
        sessionStorage.setItem("allEntries", JSON.stringify(allEntries));
    }
}

function retrieveFromSession(){
    var allEntries = sessionStorage.getItem("allEntries");
    return JSON.parse(allEntries)
}

function onFormSubmit(){
    var entry = readFormData();
    console.log(entry);
    storeInSession(entry);
    var allEntries = sessionStorage.getItem("allEntries");
    console.log(JSON.parse(allEntries));
    resetData();
}

function readFormData() {
    var entry = {} 
    entry.client_name = document.getElementById("client_name").value;
    entry.project_name = document.getElementById("project_name").value;
    entry.budget = document.getElementById("budget").value;
    return entry; 
}

var total = 0;
function populateTable(){
    var allEntries = retrieveFromSession();
    allEntries.forEach(entry => {insertNewRecord(entry); total+=parseInt(entry.budget)});
    var table = document.getElementById("project_list");
    console.log(table);

    var body = table.getElementsByTagName("tbody")[0];
    var newRow = body.insertRow(body.length);
    newRow.setAttribute("style", "display : flex; display-direction: row; align-items: center; height: 50px; padding: 5px; border-top: black 3px solid; background-color: white");
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    cell1.setAttribute('style', 'flex: 1;  text-align: center')  
    cell2.setAttribute('style', 'flex: 1;  text-align: center')  
    cell3.setAttribute('style', 'flex: 1;  text-align: center')
    var a = document.createElement("a");
    a.innerHTML = 'Back'
    a.href = 'mainPage.html';
    a.setAttribute('style', 'text-decoration: none');         // Create a <li> node
    cell1.appendChild(a);
    cell2.innerHTML='Total Budget Requested: ';          
    cell3.innerHTML= '$' + total;    

}

function insertNewRecord(entry){
    var table = document.getElementById("project_list");
    console.log(table);

    var body = table.getElementsByTagName("tbody")[0];

    var newRow = body.insertRow(body.length);  // row created 
    
    var cell1 = newRow.insertCell(0);          // cell created 
    cell1.innerHTML=entry.client_name;                 // value placed 
   
    var cell2 = newRow.insertCell(1);          // cell created 
    cell2.innerHTML=entry.project_name; 
    
    var cell3 = newRow.insertCell(2);
    cell3.innerHTML=entry.budget; 
    cell1.setAttribute('style', 'flex: 1;  text-align: center')  
    cell2.setAttribute('style', 'flex: 1;  text-align: center')  
    cell3.setAttribute('style', 'flex: 1; text-align: center')  

    newRow.setAttribute("style", "display : flex; display-direction: row; align-items: center; height: 50px; padding: 5px;");
   }

function resetData() {
    document.getElementById("client_name").value="";
    document.getElementById("project_name").value="";
    document.getElementById("budget").value="";
}