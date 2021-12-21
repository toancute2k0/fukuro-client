import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsAndAnswersRoutingModule } from './questions-and-answers-routing.module';
import { QuestionsAndAnswersComponent } from './questions-and-answers.component';
import { QuestionsAndAnswersListComponent } from './questions-and-answers-list/questions-and-answers-list.component';
import { QuestionsAndAnswersDetailComponent } from './questions-and-answers-detail/questions-and-answers-detail.component';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSummernoteModule } from 'ngx-summernote';
import { QuestionByCatComponent } from './question-by-cat/question-by-cat.component';

@NgModule({
  declarations: [
    QuestionsAndAnswersComponent,
    QuestionsAndAnswersListComponent,
    QuestionsAndAnswersDetailComponent,
    QuestionByCatComponent,
  ],
  imports: [
    NgxSummernoteModule,
    NgbModule,
    NgxPaginationModule,
    CommonModule,
    QuestionsAndAnswersRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class QuestionsAndAnswersModule {}
