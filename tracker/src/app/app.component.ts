import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { todo } from './models.ts/to_do';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(public todoService: TodoService) { }

  todos : Array<todo> = [];

  ngOnInit() : void {
    this.todoService.fetchToDos().subscribe((todos : Array<todo>) => {
      this.todos = todos;
      console.log(this.todos);
    }, (error) => {
      console.log(error);
    })
  }


  taskRef=new FormGroup({
    Name : new FormControl(null, {validators: [Validators.required, Validators.minLength(1), Validators.maxLength(15)]}),
    Task : new FormControl(null, {validators: [Validators.required, Validators.minLength(1)]}),
    Deadline : new FormControl(null, {validators: [Validators.required]})
  });

  addTask(){
    let todo : todo = {
      id : this.todos[this.todos.length - 1].id + 1,
      name : this.taskRef.value.Name,
      task : this.taskRef.value.Task,
      deadline : this.taskRef.value.Deadline
    }
    this.todoService.storeToDo(todo);
  }

}
