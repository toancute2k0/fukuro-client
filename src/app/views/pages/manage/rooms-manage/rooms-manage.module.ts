import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomsManageRoutingModule } from './rooms-manage-routing.module';
import { RoomsManageComponent } from './rooms-manage.component';
import { RoomsManageCreateComponent } from './rooms-manage-create/rooms-manage-create.component';
import { RoomsManageEditComponent } from './rooms-manage-edit/rooms-manage-edit.component';
import { RoomsManageListComponent } from './rooms-manage-list/rooms-manage-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    RoomsManageComponent,
    RoomsManageCreateComponent,
    RoomsManageEditComponent,
    RoomsManageListComponent
  ],
  imports: [
    Ng2SmartTableModule,
    NgxPaginationModule,
    CommonModule,
    RoomsManageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RoomsManageModule {}
