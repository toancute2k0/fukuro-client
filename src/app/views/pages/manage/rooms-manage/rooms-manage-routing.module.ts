import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsManageCreateComponent } from './rooms-manage-create/rooms-manage-create.component';
import { RoomsManageEditComponent } from './rooms-manage-edit/rooms-manage-edit.component';
import { RoomsManageListComponent } from './rooms-manage-list/rooms-manage-list.component';
import { RoomsManageComponent } from './rooms-manage.component';

const routes: Routes = [
  {
    path: '',
    component: RoomsManageComponent,
    children: [
      {
        path: 'list',
        component: RoomsManageListComponent,
      },
      {
        path: 'create',
        component: RoomsManageCreateComponent,
      },
      {
        path: 'edit/:id',
        component: RoomsManageEditComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsManageRoutingModule {}
