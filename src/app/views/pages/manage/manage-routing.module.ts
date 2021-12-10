import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage.component';

const routes: Routes = [
  {
    path: '',
    component: ManageComponent,
    children: [
      {
        path: 'motels',
        loadChildren: () =>
          import('./motels-manage/motels-manage.module').then(
            (m) => m.MotelsManageModule
          ),
      },
      {
        path: 'rooms',
        loadChildren: () =>
          import('./rooms-manage/rooms-manage.module').then(
            (m) => m.RoomsManageModule
          ),
      },
      {
        path: 'renters',
        loadChildren: () =>
          import('./renters-manage/renters-manage.module').then(
            (m) => m.RentersManageModule
          ),
      },
      {
        path: 'bills',
        loadChildren: () =>
          import('./bills-manage/bills-manage.module').then(
            (m) => m.BillsManageModule
          ),
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
