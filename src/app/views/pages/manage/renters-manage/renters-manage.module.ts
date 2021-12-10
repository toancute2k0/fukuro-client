import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RentersManageRoutingModule } from './renters-manage-routing.module';
import { RentersManageComponent } from './renters-manage.component';
import { RentersManageCreateComponent } from './renters-manage-create/renters-manage-create.component';
import { RentersManageEditComponent } from './renters-manage-edit/renters-manage-edit.component';
import { RentersManageListComponent } from './renters-manage-list/renters-manage-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    RentersManageComponent,
    RentersManageCreateComponent,
    RentersManageEditComponent,
    RentersManageListComponent
  ],
  imports: [
    Ng2SmartTableModule,
    NgxPaginationModule,
    CommonModule,
    RentersManageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class RentersManageModule {}
