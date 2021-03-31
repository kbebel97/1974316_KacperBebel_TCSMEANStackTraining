import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { answer } from './models/answer.model';
import { question } from './models/question.model'

@Injectable({
  providedIn: 'root'
})

export class TestService {
  questions : Array<question> = [];
  answers : Array<number> = [];

  constructor(public http:HttpClient) { }

  loadTest() {
    return this.http.get<question[]>("/assets/sample_test.json");
  }

  saveAnswers(answers : Array<answer>){
    sessionStorage.setItem("answers", JSON.stringify(answers));
  }

  retrieveAnswers(){
    let answers = sessionStorage.getItem("answers");
    return JSON.parse(answers);
  }

  clearSession(){
    sessionStorage.clear();
  }





}
