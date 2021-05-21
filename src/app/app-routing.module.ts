import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {RandomQuestionComponent} from "./random-question/random-question.component";
import {CategoryQuestionComponent} from "./category-question/category-question.component";
import {FilteredQuestionComponent} from "./filtered-question/filtered-question.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/random', pathMatch: 'full'},
  {path: 'random', component: RandomQuestionComponent},
  {path: 'by-category', component:CategoryQuestionComponent},
  {path: 'filter', component: FilteredQuestionComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
