import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/noauth.guard';
import { LoginComponent } from './views/pages/auth/login/login.component';
import { RegisterComponent } from './views/pages/auth/register/register.component';
import { ForgotPasswordComponent } from './views/pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/pages/auth/reset-password/reset-password.component';
import { BlogCategoryComponent } from './views/pages/blogs/blog-category/blog-category.component';
import { ContactComponent } from './views/pages/contact/contact.component';
import { HomeComponent } from './views/pages/home/home.component';
import { NotFoundComponent } from './views/pages/not-found/not-found.component';
import { PromotionsComponent } from './views/pages/promotions/promotions.component';
import { RentalNewsComponent } from './views/pages/rental-news/rental-news.component';
import { EditRentalComponent } from './views/pages/my-account/edit-rental/edit-rental.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'dang-bai',
    component: RentalNewsComponent,
    canActivate: [AuthGuard],
  },
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
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'dang-nhap', component: LoginComponent, canActivate: [NoAuthGuard] },
  {
    path: 'thanh-toan',
    component: PromotionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chinh-sua-bai-viet',
    component: EditRentalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'my-account',
    loadChildren: () =>
      import('./views/pages/my-account/my-account.module').then(
        (m) => m.MyAccountModule
      ),
    canActivate: [AuthGuard],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
