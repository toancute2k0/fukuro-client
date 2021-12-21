import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsAndAnswersComponent } from './questions-and-answers.component';
import { QuestionsAndAnswersListComponent } from './questions-and-answers-list/questions-and-answers-list.component';
import { QuestionsAndAnswersDetailComponent } from './questions-and-answers-detail/questions-and-answers-detail.component';
import { QuestionByCatComponent} from './question-by-cat/question-by-cat.component';
const routes: Routes = [
  {
    path: '',
    component: QuestionsAndAnswersComponent,
    children: [
      {
        path: 'danh-sach',
        component: QuestionsAndAnswersListComponent,
      },
      {
        path: 'chi-tiet',
        component: QuestionsAndAnswersDetailComponent,
      },
      {
        path: 'cau-hoi-theo-chuyen-muc/:id',
        component: QuestionByCatComponent,pathMatch: 'full'
      },
      {
        path: 'chi-tiet/:id',
        children:
          [
            { path: '', component: QuestionsAndAnswersDetailComponent, pathMatch: 'full'}
          ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsAndAnswersRoutingModule {}
