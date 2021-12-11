import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ManageComponent } from './manage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    ManageComponent,
  ],

  imports: [
    CommonModule,
    ManageRoutingModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000, // 2 seconds
      progressBar: true,
    }),
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class ManageModule {}
