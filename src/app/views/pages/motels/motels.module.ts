import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotelsRoutingModule } from './motels-routing.module';
import { MotelsComponent } from './motels.component';
import { MotelListComponent } from './motel-list/motel-list.component';
import { MotelDetailComponent } from './motel-detail/motel-detail.component';
import { ComponentsModule } from '../../components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { JwPaginationModule } from 'jw-angular-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
// import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [MotelsComponent, MotelListComponent, MotelDetailComponent],
  imports: [
    NgxPaginationModule,
    JwPaginationModule,
    CommonModule,
    MotelsRoutingModule,
    HttpClientModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    // AgmCoreModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MotelsModule {}
