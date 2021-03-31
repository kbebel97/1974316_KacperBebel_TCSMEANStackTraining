import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { answer } from '../models/answer.model';
import { question } from '../models/question.model';
import { TestService } from '../test.service';

@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.component.html',
  styleUrls: ['./results-view.component.css']
})
export class ResultsViewComponent implements OnInit {
  questions : Array<question> = [];
  answers : Array<answer> = [];
  current_question : question;
  current_answer : number;
  answer_selected : boolean = false;

  constructor(public testService: TestService, private Activatedroute : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.testService.loadTest().subscribe((result)=> {
      this.questions = result;
      let answers = this.testService.retrieveAnswers();
      this.answers = answers;
      this.current_question = this.questions[0];
    }, (error) => {
      console.log(error);
    }
    );
  }

  next(){
    this.current_question = this.questions[this.questions.indexOf(this.current_question) + 1];
  };

  previous(){
    this.current_question = this.questions[this.questions.indexOf(this.current_question) - 1];
  };

  finish(){
    this.testService.clearSession();
    this.router.navigate(["main"]);
  }

  isArray(object){
    if(object instanceof Array){
      return true;
    } else return false;
  }

  check_answer(current_question : question) : number{
    for(let answer of this.answers){
      if(answer.question_id == current_question.id){
        return answer.answer;
      }
    }
    return -1;
  }


}
