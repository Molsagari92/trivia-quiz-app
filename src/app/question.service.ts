import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Category} from "./category.model";
import {Question} from "./question.model";
import {CategoryService} from "./category.service";

@Injectable()
export class QuestionService {
  values: number[] = [100, 200, 300, 400, 500, 600, 800, 1000];

  constructor(
    private http: HttpClient,
    private cService: CategoryService) {
  }

  getRandomQuestion() {
    return this.http.get('http://jservice.io/api/random');
  }

  getQuestionByCategory(id: number) {
    return this.http.get('http://jservice.io/api/clues?category=' + id);
  }

  getValues(){
    return this.values.slice();
  }

  getFilteredQuestion(value:any, category:any) {

    /*if (value != 0) {
      filterData.value = value
    }
    if (category != 0) {
      filterData['category'] = category
    }
    if (minDate != '') {
      filterData['min_date'] = minDate
    }
    if (minDate != '') {
      filterData['max_date'] = maxDate
    }*/
    return this.http.get('http://jservice.io/api/clues', {params: {'value':value, 'category':category}});
  }

  createQuestion(responseData: any) {
    let randomIndex: number = 0;
    if (responseData.length > 1) {
      randomIndex = Math.floor(Math.random() * responseData.length);
    }
    let question = new Question(
      responseData[randomIndex]['question'],
      responseData[randomIndex]['answer']
        .replace('</i>', '')
        .replace('/', '')
        .replace('<i>', '')
        .replace('\\', ''),
      new Category(
        responseData[0]['category'],
        responseData[0]['category']['title'],
        responseData[0]['category']['clues_count'],
        responseData[0]['category']['created_at'],
        responseData[0]['category']['updated_at']),
      responseData[0]['category_id'], 0);
    this.cService.addToCategories(responseData);
    return question;
  }
}
