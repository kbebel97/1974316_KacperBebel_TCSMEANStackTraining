
function onload(){
    fetch("https://jsonplaceholder.typicode.com/todos").
    then(res=>res.json()).
    then(data=>console.log(data)).catch(error=>console.log(error));
}
