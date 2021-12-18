import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsComponent } from './blogs.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { ComponentsModule } from '../../components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogCategoryComponent } from './blog-category/blog-category.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';

@NgModule({
  declarations: [
    BlogsComponent,
    BlogDetailComponent,
    BlogListComponent,
    BlogCategoryComponent,
  ],
  imports: [
    CommonModule,
    BlogsRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class BlogsModule {}
