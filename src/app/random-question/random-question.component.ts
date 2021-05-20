import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";

import {Question} from '../question.model';
import {QuestionService} from "../question.service";
import {CategoryService} from "../category.service";
import {Category} from "../category.model";


@Component({
  selector: 'app-random-question',
  templateUrl: './random-question.component.html',
  styleUrls: ['./random-question.component.css']
})
export class RandomQuestionComponent implements OnInit {
  filterChecked: boolean = false;
  delayChecked: boolean = false;
  showAnswer: boolean = false;
  timeOut: number = 0;
  actualQuestion: Question =
    new Question(
      '',
      '',
      new Category(
        0,
        '',
        0,
        '',
        ''
      ), 0);
  categories: Category[]=[];


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private qService: QuestionService,
    private cService: CategoryService) {
  }

  ngOnInit() {
    this.onGetQuestion();
  }

  onGetQuestion() {
    this.showAnswer = false;
    this.qService.getRandomQuestion().subscribe((responseData: any) => {
      this.actualQuestion = this.qService.createQuestion(responseData);
    });
    setTimeout(() => {
      this.showAnswer = true;
    }, this.timeOut * 1000);
  }

  onFilterCheck() {
    this.filterChecked = !this.filterChecked;
  }

  onDelayCheck() {
    this.delayChecked = !this.delayChecked;
    if (this.delayChecked == false) {
      this.timeOut = 0;
    }
  }

  onSaveDelay(value: string) {
    this.timeOut = +value;
  }

}
