import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {QuestionService} from "../question.service";
import {Category} from "../category.model";
import {CategoryService} from "../category.service";
import {Question} from "../question.model";

@Component({
  selector: 'app-filtered-question',
  templateUrl: './filtered-question.component.html',
  styleUrls: ['./filtered-question.component.css']
})
export class FilteredQuestionComponent implements OnInit, OnDestroy {
  values: number[] = [];
  chosenValue = null;
  categories: Category[] = [];
  chosenCategory = null;
  showAnswer: boolean = false;
  timeOut: number = 0;
  delayChecked: boolean = false;
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
      ), 0, 0);
  private cChangedSub: Subscription | undefined;

  constructor(private qService: QuestionService, private cService: CategoryService) {
  }

  ngOnInit(): void {
    this.values = this.qService.getValues();
    this.cChangedSub = this.cService.categoriesChanged.subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      });
    this.categories = this.cService.getCategories();
  }

  onSelectValue(value: any) {
    this.chosenValue = value;
  }

  onSelectCategory(catId: any) {
    this.chosenCategory = catId;
  }

  onGetQuestion() {
    this.showAnswer = false;
    this.qService.getFilteredQuestion(this.chosenValue, this.chosenCategory).subscribe((responseData: any) => {
      this.actualQuestion = this.qService.createQuestion(responseData);
    });
    setTimeout(() => {
      this.showAnswer = true;
    }, this.timeOut * 1000);
  }

  onSaveDelay(value: string) {
    this.timeOut = +value;
  }


  onDelayCheck() {
    this.delayChecked = !this.delayChecked;
    if (this.delayChecked == false) {
      this.timeOut = 0;
    }
  }


  ngOnDestroy() {
    if (this.cChangedSub != undefined) {
      this.cChangedSub.unsubscribe();
    }
  }

}
