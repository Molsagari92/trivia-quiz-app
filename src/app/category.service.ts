import {Category} from "./category.model";
import {Subject} from "rxjs";

export class CategoryService {
  categoriesChanged = new Subject<Category[]>();
  categories: Category[] = [];

  addToCategories(responseData: any) {
    let resp = responseData[0]['category'];
    if (this.categories.length != 0) {
      let notExists = this.categories.find(x => x.id === resp['id']);
      if (notExists === undefined) {
        let actualCategory = new Category(
          resp['id'],
          resp['title'],
          resp['clues_count'],
          resp['created_at'],
          resp['updated_at']);
        this.categories.push(actualCategory);
        this.categoriesChanged.next(this.categories.slice());
      }
    } else {
      let actualCategory = new Category(
        resp['id'],
        resp['title'],
        resp['clues_count'],
        resp['created_at'],
        resp['updated_at']);
      this.categories.push(actualCategory);
      this.categoriesChanged.next(this.categories.slice());
    }
  }

}
