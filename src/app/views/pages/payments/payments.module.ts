import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { PaymentsComponent } from './payments.component';
import { PaymentComponent } from './payment/payment.component';
import { ResultComponent } from './result/result.component';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    PaymentsComponent,
    PaymentComponent,
    ResultComponent
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    PaymentsRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PaymentsModule {}
