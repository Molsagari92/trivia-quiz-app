import {Category} from "./category.model";

export class Question {
  question: string;
  answer: string;
  category: Category;
  categoryId: number

  constructor(
    question: string,
    answer: string,
    category: Category,
    categoryId: number) {
    this.question = question;
    this.answer = answer;
    this.category = category;
    this.categoryId = categoryId;
  }

}
