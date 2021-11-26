import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BannerComponent } from './banner/banner.component';
import { FeaturedPropertyComponent } from './featured-property/featured-property.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { LatestPropertyComponent } from './latest-property/latest-property.component';
import { MotelSearchComponent } from './motel-search/motel-search.component';
import { OrderPackageComponent } from './order-package/order-package.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { ListBlogRentalComponent } from './list-blog-rental/list-blog-rental.component';

@NgModule({
  declarations: [
    BannerComponent,
    FeaturedPropertyComponent,
    LatestNewsComponent,
    LatestPropertyComponent,
    MotelSearchComponent,
    OrderPackageComponent,
    ListBlogRentalComponent,
  ],
  imports: [CommonModule, HttpClientModule, CarouselModule, RouterModule],
  exports: [
    BannerComponent,
    FeaturedPropertyComponent,
    LatestNewsComponent,
    LatestPropertyComponent,
    MotelSearchComponent,
    OrderPackageComponent,
    ListBlogRentalComponent,
  ],
})
export class ComponentsModule {}
