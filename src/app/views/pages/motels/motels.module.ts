import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { JwPaginationModule } from 'jw-angular-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentsModule } from '../../components/components.module';
import { MotelDetailComponent } from './motel-detail/motel-detail.component';
import { MotelListComponent } from './motel-list/motel-list.component';
import { MotelsRoutingModule } from './motels-routing.module';
import { MotelsComponent } from './motels.component';

@NgModule({
  declarations: [MotelsComponent, MotelListComponent, MotelDetailComponent],
  imports: [
    CommonModule,
    MotelsRoutingModule,
    HttpClientModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    NgxPaginationModule,
    JwPaginationModule,
  ],
})
export class MotelsModule {}
