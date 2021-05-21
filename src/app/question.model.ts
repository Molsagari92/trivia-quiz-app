import {Category} from "./category.model";

export class Question {
  question: string;
  answer: string;
  category: Category;
  categoryId: number;
  value: number;

  constructor(
    question: string,
    answer: string,
    category: Category,
    categoryId: number,
    value: number) {
    this.question = question;
    this.answer = answer;
    this.category = category;
    this.categoryId = categoryId;
    this.value = value;
  }

}
