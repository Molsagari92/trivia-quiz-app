import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {RandomQuestionComponent} from './random-question/random-question.component';
import {CategoryQuestionComponent} from './category-question/category-question.component';
import {AppRoutingModule} from "./app-routing.module";
import {QuestionService} from "./question.service";
import {CategoryService} from "./category.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RandomQuestionComponent,
    CategoryQuestionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CategoryService, QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
