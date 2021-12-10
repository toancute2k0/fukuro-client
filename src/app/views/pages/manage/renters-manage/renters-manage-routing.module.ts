import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RentersManageCreateComponent } from './renters-manage-create/renters-manage-create.component';
import { RentersManageEditComponent } from './renters-manage-edit/renters-manage-edit.component';
import { RentersManageListComponent } from './renters-manage-list/renters-manage-list.component';
import { RentersManageComponent } from './renters-manage.component';

const routes: Routes = [
  {
    path: '',
    component: RentersManageComponent,
    children: [
      {
        path: 'list',
        component: RentersManageListComponent,
      },
      {
        path: 'create',
        component: RentersManageCreateComponent,
      },
      {
        path: 'edit/:id',
        component: RentersManageEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RentersManageRoutingModule {}
