import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { todo } from './models.ts/to_do';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(public http:HttpClient) { }

  storeToDo(todo : todo){
    this.http.post("http://localhost:3000/todos",todo).
    subscribe(result=>console.log(result),error=>console.log(error));
  }

  fetchToDos(){
    return this.http.get("http://localhost:3000/todos");
  }
}
