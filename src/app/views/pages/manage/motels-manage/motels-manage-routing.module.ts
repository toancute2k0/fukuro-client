import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MotelsManageCreateComponent } from './motels-manage-create/motels-manage-create.component';
import { MotelsManageEditComponent } from './motels-manage-edit/motels-manage-edit.component';
import { MotelsManageListComponent } from './motels-manage-list/motels-manage-list.component';
import { MotelsManageComponent } from './motels-manage.component';

const routes: Routes = [
  {
    path: '',
    component: MotelsManageComponent,
    children: [
      {
        path: 'list',
        component: MotelsManageListComponent,
      },
      {
        path: 'create',
        component: MotelsManageCreateComponent,
      },
      {
        path: 'edit/:id',
        component: MotelsManageEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MotelsManageRoutingModule {}
