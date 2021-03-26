import { Component, OnInit, Renderer2 } from '@angular/core';
import { user } from '../shared/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { contact } from '../shared/contact.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  user : user;
  sub;

  constructor(private Activatedroute : ActivatedRoute, private router : Router, private renderer : Renderer2) { }


  contactRef=new FormGroup({
    name : new FormControl(null, {validators: [Validators.required, Validators.minLength(1), Validators.maxLength(15)]}),
    number : new FormControl(null, {validators: [Validators.required, Validators.minLength(10), Validators.maxLength(11)]})
  });

  ngOnInit(): void {
    this.sub = this.Activatedroute.paramMap.subscribe(params => {
      console.log(this.retrieveUser(parseInt(params.get('id'))));
      this.user = this.retrieveUser(parseInt(params.get('id')));

   });
  }

  retrieveUser(id : number) : user{
    let users : Array<user>= this.retrieveUsers();
    if(users){
      let user : user;
      users.forEach((user_)=>{
        if(user_.id == id){
          user = user_;
        }
      })
      return user;
    } else return null;
  }

  addContact(){
    let contact : contact = {
      name : this.contactRef.get("name")?.value,
      number : this.contactRef.get("number")?.value
    }
    if(this.contactRef.valid){
      let users : Array<user> = this.retrieveUsers();
      users.splice(users.indexOf(this.user), 1);
      this.user.contact_details.push(contact);
      users.push(this.user);
      sessionStorage.setItem("users", JSON.stringify(users));
    } else{
      const invalid = [];
      const controls = this.contactRef.controls;
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
            case 'name' : {
              let warning = document.createElement('div');
              warning.setAttribute('style', 'display: flex; justify-content: center; align-items: center; border: 1px solid black; border-radius: 10px; padding: 5px');
              let warning_msg = document.createElement('div');
              warning_msg.setAttribute('style', 'font-size: 1em; max-width: 350px');
              warning_msg.innerHTML = 'Name must be entered';
              warning.appendChild(warning_msg);
              message.appendChild(warning);
              break;
            }
            case 'number' : {
              let warning = document.createElement('div');
              warning.setAttribute('style', 'display: flex; justify-content: center; align-items: center; border: 1px solid black; border-radius: 10px; padding: 5px');
              let warning_msg = document.createElement('div');
              warning_msg.setAttribute('style', 'font-size: 1em; max-width: 350px');
              warning_msg.innerHTML = 'Number must be between 10 and 11 digits';
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

  retrieveUsers() : Array<user> {
    var users = sessionStorage.getItem("users");
    return JSON.parse(users);
  }

  login(){
    this.router.navigate(["login"]);
  }

}
