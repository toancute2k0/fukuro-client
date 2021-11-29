import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MotelDetailComponent } from './motel-detail/motel-detail.component';
import { MotelListComponent } from './motel-list/motel-list.component';
import { MotelsComponent } from './motels.component';

const routes: Routes = [
  {
    path: '',
    component: MotelsComponent,
    children: [
      {
        path: '',
        component: MotelListComponent,
      },
      {
        path: ':slug',
        component: MotelDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotelsRoutingModule {}
