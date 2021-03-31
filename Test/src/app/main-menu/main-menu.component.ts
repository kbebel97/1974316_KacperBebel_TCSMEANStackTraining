import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { question } from 'src/app/models/question.model';
import { TestService } from '../test.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  questions : Array<question> = [];
  question_number : number = 0;
  msg : string;
  constructor(public testService : TestService, public router:Router,  private Activatedroute : ActivatedRoute) { }


  ngOnInit(): void {
    let answers : Array<number> = this.testService.retrieveAnswers();
    if(answers){
      this.msg = 'Resume';
    } else {
      this.msg = 'Begin';
    }

  }

  take_test(){
    this.router.navigate(["/test"]);
  }

}
