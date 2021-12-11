import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotelsManageRoutingModule } from './motels-manage-routing.module';
import { MotelsManageComponent } from './motels-manage.component';
import { MotelsManageCreateComponent } from './motels-manage-create/motels-manage-create.component';
import { MotelsManageEditComponent } from './motels-manage-edit/motels-manage-edit.component';
import { MotelsManageListComponent } from './motels-manage-list/motels-manage-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    MotelsManageComponent,
    MotelsManageCreateComponent,
    MotelsManageEditComponent,
    MotelsManageListComponent
  ],
  imports: [
    Ng2SmartTableModule,
    NgxPaginationModule,
    CommonModule,
    MotelsManageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MotelsManageModule {}
