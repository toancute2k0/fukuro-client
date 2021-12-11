import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillsManageRoutingModule } from './bills-manage-routing.module';
import { BillsManageComponent } from './bills-manage.component';
import { BillsManageCreateComponent } from './bills-manage-create/bills-manage-create.component';
import { BillsManageEditComponent } from './bills-manage-edit/bills-manage-edit.component';
import { BillsManageListComponent } from './bills-manage-list/bills-manage-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [
    BillsManageComponent,
    BillsManageListComponent,
    BillsManageCreateComponent,
    BillsManageEditComponent
  ],
  imports: [
    Ng2SmartTableModule,
    NgxPaginationModule,
    CommonModule,
    BillsManageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class BillsManageModule {}
