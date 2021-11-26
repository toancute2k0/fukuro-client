import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotelsRoutingModule } from './motels-routing.module';
import { MotelsComponent } from './motels.component';
import { MotelListComponent } from './motel-list/motel-list.component';
import { MotelDetailComponent } from './motel-detail/motel-detail.component';
import { ComponentsModule } from '../../components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { JwPaginationModule } from 'jw-angular-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LatestPropertyComponent } from '../../components/latest-property/latest-property.component';

@NgModule({
  declarations: [MotelsComponent, MotelListComponent, MotelDetailComponent],
  imports: [
    JwPaginationModule,
    CommonModule,
    MotelsRoutingModule,
    HttpClientModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MotelsModule {}
