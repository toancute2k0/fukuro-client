import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillsManageCreateComponent } from './bills-manage-create/bills-manage-create.component';
import { BillsManageEditComponent } from './bills-manage-edit/bills-manage-edit.component';
import { BillsManageListComponent } from './bills-manage-list/bills-manage-list.component';
import { BillsManageComponent } from './bills-manage.component';

const routes: Routes = [
  {
    path: '',
    component: BillsManageComponent,
    children: [
      {
        path: 'list',
        component: BillsManageListComponent,
      },
      {
        path: 'create',
        component: BillsManageCreateComponent,
      },
      {
        path: 'edit/:id',
        component: BillsManageEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillsManageRoutingModule {}
