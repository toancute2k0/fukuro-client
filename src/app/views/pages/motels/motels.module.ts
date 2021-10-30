import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotelsRoutingModule } from './motels-routing.module';
import { MotelsComponent } from './motels.component';
import { MotelListComponent } from './motel-list/motel-list.component';
import { MotelDetailComponent } from './motel-detail/motel-detail.component';
import { ComponentsModule } from '../../components/components.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MotelsComponent, MotelListComponent, MotelDetailComponent],
  imports: [
    CommonModule,
    MotelsRoutingModule,
    HttpClientModule,
    ComponentsModule,
  ],
})
export class MotelsModule {}
