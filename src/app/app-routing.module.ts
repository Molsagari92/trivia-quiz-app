import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {RandomQuestionComponent} from "./random-question/random-question.component";
import {CategoryQuestionComponent} from "./category-question/category-question.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/random', pathMatch: 'full'},
  {path: 'random', component: RandomQuestionComponent},
  {path: 'by-category', component:CategoryQuestionComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
