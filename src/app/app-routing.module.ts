import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/pages/auth/login/login.component';
import { RegisterComponent } from './views/pages/auth/register/register.component';
import { BlogCategoryComponent } from './views/pages/blogs/blog-category/blog-category.component';
import { ContactComponent } from './views/pages/contact/contact.component';
import { HomeComponent } from './views/pages/home/home.component';
import { NotFoundComponent } from './views/pages/not-found/not-found.component';
import { RentalNewsComponent } from './views/pages/rental-news/rental-news.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dang-bai', component: RentalNewsComponent },
  { path: 'lien-he', component: ContactComponent },
  { path: 'trang-chu', redirectTo: '', pathMatch: 'full' },
  {
    path: 'bai-viet',
    loadChildren: () =>
      import('./views/pages/blogs/blogs.module').then((m) => m.BlogsModule),
  },
  {
    path: 'danh-muc-bai-viet/:slug',
    component: BlogCategoryComponent,
  },
  {
    path: 'thue-nha-dat',
    loadChildren: () =>
      import('./views/pages/motels/motels.module').then((m) => m.MotelsModule),
  },
  { path: 'dang-ky', component: RegisterComponent },
  { path: 'dang-nhap', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
