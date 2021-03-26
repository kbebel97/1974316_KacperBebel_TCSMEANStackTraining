import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from '../shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRef=new FormGroup({
    username :new FormControl(),
    password :new FormControl()
  });

  constructor(public router:Router, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  checkUser() {
    let username = this.loginRef.get("username")?.value;
    let password = this.loginRef.get("password")?.value;
    if(!this.validateUser(username, password)){
      let message : HTMLElement = document.getElementById('msg');
      let warning = document.createElement('div');
      warning.setAttribute('style', 'display: flex; justify-content: center; align-items: center; border: 1px solid black; border-radius: 10px;');
      let warning_msg = document.createElement('div');
      warning_msg.setAttribute('style', 'font-size: 1em; max-width: 350px');
      warning_msg.innerHTML = 'User not found';
      warning.appendChild(warning_msg);
      message.appendChild(warning);
      this.renderer.setStyle(message, 'display', 'flex');
      this.delay(3000).then((any)=> {
        while (message.firstChild) {
          message.removeChild(message.firstChild);
        }
        this.renderer.setStyle(message, 'display', 'none');
      })
    } else {
      this.retrieveUser(username, password);
      this.router.navigate(["portfolio", this.retrieveUser(username, password).id]);
    }
  }


  validateUser(username : string, password : string) : boolean {
    let users : Array<user>= this.retrieveUsers();
    if(users){
      let flag : boolean = false;
      users.forEach((user)=>{
        if(user.username == username && user.password == password){
          flag = true;
        }
      })
      return flag;
    } return false;
  }

  register(){
    this.router.navigate(["register"]);
  }

  retrieveUser(username : string, password : string) : user{
    let users : Array<user>= this.retrieveUsers();
    if(users){
      let user : user;
      users.forEach((user_)=>{
        if(user_.username == username && user_.password == password){
          user = user_;
        }
      })
      return user;
    } else return null;
  }

  retrieveUsers(){
    var users = sessionStorage.getItem("users");
    return JSON.parse(users);
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }



}
