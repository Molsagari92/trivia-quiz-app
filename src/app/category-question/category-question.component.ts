import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";

import {Question} from '../question.model';
import {QuestionService} from "../question.service";
import {CategoryService} from "../category.service";
import {Category} from "../category.model";


@Component({
  selector: 'app-category-question',
  templateUrl: './category-question.component.html',
  styleUrls: ['./category-question.component.css'],
})

export class CategoryQuestionComponent implements OnInit, OnDestroy {
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
  categories: Category[] = [];
  actualCategoryId: number = 0;
  private cChangedSub: Subscription | undefined;
  timeOut: number = 0;
  showAnswer: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private cService: CategoryService,
    private qService: QuestionService) {
  }

  ngOnInit() {
    this.cChangedSub = this.cService.categoriesChanged.subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      });
    this.categories = this.cService.getCategories();
  }

  onSelectCategory(id: number) {
    this.showAnswer = false;
    this.actualCategoryId = id;
    this.qService.getQuestionByCategory(id).subscribe((responseData: any) => {
      this.actualQuestion = this.qService.createQuestion(responseData);
    })
    setTimeout(() => {
      this.showAnswer = true;
    }, this.timeOut * 1000);
  }


  onSaveDelay(value: string) {
    this.timeOut = +value;
  }

  ngOnDestroy() {
    if (this.cChangedSub !== undefined) {
      this.cChangedSub.unsubscribe();
    }
  }
}
