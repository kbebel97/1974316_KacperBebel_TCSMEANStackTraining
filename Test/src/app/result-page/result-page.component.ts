import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { answer } from '../models/answer.model';
import { question } from '../models/question.model';
import { TestService } from '../test.service';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent implements OnInit {
  questions : Array<question> = [];
  answers : Array<answer> = [];
  score : number = 0;

  constructor(public testService: TestService, public router : Router) { }

  msg : string;

  ngOnInit(): void {
    this.testService.loadTest().subscribe((result)=> {
      this.questions = result;
      this.answers = this.testService.retrieveAnswers();
      for(let index in this.questions){
          if(this.questions[index].answer == this.answers[index].answer){
            this.score++;
            console.log(this.score);
          }
      }
      this.score = this.score / 11 * 100;
      if(this.score > 60){
        this.msg = "You passed!"
      } else this.msg = "You failed :("
    })
  }

  view_results() : void {
    // this.testService.clearSession();
    this.router.navigate(["results_view"]);
  }

  retry_exam() : void {
    this.testService.clearSession();
    this.router.navigate(["main"]);
  }

}
