import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogsRoutingModule } from './blogs-routing.module';
import { BlogsComponent } from './blogs.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [BlogsComponent, BlogDetailComponent, BlogListComponent],
  imports: [CommonModule, BlogsRoutingModule, ComponentsModule],
})
export class BlogsModule {}
