import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { answer } from '../models/answer.model';
import { question } from '../models/question.model';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit{
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
      if(answers){
        console.log(answers);
        this.answers = answers;
        this.current_question = this.questions[answers.length - 1];
      } else this.current_question = this.questions[0];
    }, (error) => {
      console.log(error);
    }
    );
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

  select_answer(answer_ : number){
    var isFound : boolean = false;
    for(let answer of this.answers){
      if(answer.question_id == this.current_question.id){
        isFound = true;
        answer.answer = answer_;
        }
    }
    if(!isFound){
      let answer : answer = {
        question_id : this.current_question.id,
        answer : answer_
      };
      this.answers.push(answer);
    }
    this.testService.saveAnswers(this.answers);
  }

  next(){
    this.current_question = this.questions[this.questions.indexOf(this.current_question) + 1];
  };

  previous(){
    this.current_question = this.questions[this.questions.indexOf(this.current_question) - 1];
  };

  finish(){
    this.router.navigate(["/results"]);
  }
}
