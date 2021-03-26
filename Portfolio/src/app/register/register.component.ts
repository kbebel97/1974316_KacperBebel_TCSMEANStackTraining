import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { contact } from '../shared/contact.model';
import { user } from '../shared/user.model'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  msg : string = '';
  constructor(public router:Router, private renderer: Renderer2) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(["login"]);
  }



  registerRef=new FormGroup({
    username : new FormControl(null, {validators: [Validators.required, Validators.minLength(8), Validators.maxLength(15)]}),
    password : new FormControl(null, {validators: [Validators.required, Validators.minLength(8), Validators.maxLength(15)]}),
    confirm_password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8), Validators.maxLength(15)]})
  });

  registerUser(){
    let username : string = this.registerRef.get("username")?.value;  // get specific control value.
    let password = this.registerRef.get("password")?.value;
    let password_Confirm = this.registerRef.get("confirm_password")?.value;
    if(this.registerRef.valid){
      if(password == password_Confirm){
        if(this.checkUser(username)){
          let message : HTMLElement = document.getElementById('msg');
          let warning = document.createElement('div');
          warning.setAttribute('style', 'display: flex; justify-content: center; align-items: center; border: 1px solid black; border-radius: 10px;');
          let warning_msg = document.createElement('div');
          warning_msg.setAttribute('style', 'font-size: 1em; max-width: 350px');
          warning_msg.innerHTML = 'Username is already taken';
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
          this.createUser(username, password);
          this.router.navigate(["login"]);
        }
      } else {
        let message : HTMLElement = document.getElementById('msg');
        let warning = document.createElement('div');
        warning.setAttribute('style', 'display: flex; justify-content: center; align-items: center; border: 1px solid black; border-radius: 10px;');
        let warning_msg = document.createElement('div');
        warning_msg.setAttribute('style', 'font-size: 1em; max-width: 350px');
        warning_msg.innerHTML = 'Passwords do not match';
        warning.appendChild(warning_msg);
        message.appendChild(warning);
        this.renderer.setStyle(message, 'display', 'flex');
        this.delay(3000).then((any)=> {
          while (message.firstChild) {
            message.removeChild(message.firstChild);
          }
          this.renderer.setStyle(message, 'display', 'none');
        })
      }
    } else{
      const invalid = [];
      const controls = this.registerRef.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
      }
      if(invalid){
        console.log(invalid);
        let message : HTMLElement = document.getElementById('msg');
        invalid.forEach((control)=> {
          switch(control){
            case 'user' : {
              let warning = document.createElement('div');
              warning.setAttribute('style', 'display: flex; justify-content: center; align-items: center; border: 1px solid black; border-radius: 10px;');
              let warning_msg = document.createElement('div');
              warning_msg.setAttribute('style', 'font-size: 1em; max-width: 350px');
              warning_msg.innerHTML = 'Username must be between 8 and 15 characters';
              warning.appendChild(warning_msg);
              message.appendChild(warning);
              break;
            }
            case 'pass' : {
              let warning = document.createElement('div');
              warning.setAttribute('style', 'display: flex; justify-content: center; align-items: center; border: 1px solid black; border-radius: 10px;');
              let warning_msg = document.createElement('div');
              warning_msg.setAttribute('style', 'font-size: 1em; max-width: 350px');
              warning_msg.innerHTML = 'Password must be between 8 and 15 characters';
              warning.appendChild(warning_msg);
              message.appendChild(warning);
              break;
            }
          }
          this.renderer.setStyle(message, 'display', 'flex');
          this.delay(3000).then((any)=> {
            while (message.firstChild) {
              message.removeChild(message.firstChild);
            }
            this.renderer.setStyle(message, 'display', 'none');
          })
        })
      }
    }
  }

  async delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }


  checkUser(username : string) : boolean {
    let users : Array<user>= this.retrieveUsers();
    if(users){
      let flag : boolean = false;
      users.forEach((user)=>{
        if(user.username == username){
          flag = true;
        }
      })
      return flag;
    } return false;
  }

  createUser(username_: string, password_ : string){
    let users : Array<user> = this.retrieveUsers();
    console.log(users);
    if(users){
      let id_ = users.length;
      let _contact_details : Array<contact> = [];
      let user : user = {
        id: id_,
        username : username_,
        password : password_,
        contact_details : _contact_details
      }
      users.push(user);
      this.storeUsers(users);
    } else {
      let users : Array<user> = [];
      let _contact_details : Array<contact> = [];
      let user : user = {
        id: 0,
        username : username_,
        password : password_,
        contact_details : _contact_details
      }
      users.push(user);
      this.storeUsers(users);
    }
  }

  storeUsers(users : Array<user>){
    sessionStorage.setItem("users", JSON.stringify(users));
  }

  retrieveUsers(){
    var users = sessionStorage.getItem("users");
    return JSON.parse(users);
  }


}
