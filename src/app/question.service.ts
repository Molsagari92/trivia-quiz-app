import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Category} from "./category.model";
import {Question} from "./question.model";
import {CategoryService} from "./category.service";

@Injectable()
export class QuestionService {
  constructor(
    private http: HttpClient,
    private cService: CategoryService) {
  }

  getRandomQuestion() {
    return this.http.get('http://jservice.io/api/random');
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
      responseData[0]['category_id']);
    this.cService.addToCategories(responseData);
    return question;
  }
}
