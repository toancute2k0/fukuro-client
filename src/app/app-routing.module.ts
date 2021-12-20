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
import { PaymentComponent } from './views/pages/payments/payment/payment.component';
import { RentalNewsComponent } from './views/pages/rental-news/rental-news.component';
import { SiteLayoutComponent } from './views/layouts/site-layout/site-layout.component';
import { ManageLayoutComponent } from './views/layouts/manage-layout/manage-layout.component';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'trang-chu', redirectTo: '', pathMatch: 'full' },
      { path: 'dang-bai', component: RentalNewsComponent, pathMatch: 'full' },
      { path: 'lien-he', component: ContactComponent, pathMatch: 'full' },
      {
        path: 'bai-viet',
        loadChildren: () =>
          import('./views/pages/blogs/blogs.module').then((m) => m.BlogsModule),
      },
      {
        path: 'hoi-dap',
        loadChildren: () =>
          import(
            './views/pages/questions-and-answers/questions-and-answers.module'
          ).then((m) => m.QuestionsAndAnswersModule),
      },
      {
        path: 'thue-nha-dat',
        loadChildren: () =>
          import('./views/pages/motels/motels.module').then(
            (m) => m.MotelsModule
          ),
      },
      {
        path: 'danh-muc-bai-viet/:slug',
        children: [
          { path: '', component: BlogCategoryComponent, pathMatch: 'full' },
        ],
      },
      {
        path: 'chinh-sua-bai-viet/:slug',
        children: [
          { path: '', component: BlogCategoryComponent, pathMatch: 'full' },
        ],
      },
      {
        path: 'dang-ky',
        children: [
          { path: '', component: RegisterComponent, pathMatch: 'full' },
        ],
      },
      {
        path: 'forgot-password',
        children: [
          { path: '', component: ForgotPasswordComponent, pathMatch: 'full' },
        ],
      },
      {
        path: 'reset-password',
        children: [
          { path: '', component: ResetPasswordComponent, pathMatch: 'full' },
        ],
      },
      {
        path: 'dang-nhap',
        children: [{ path: '', component: LoginComponent, pathMatch: 'full' }],
        canActivate: [NoAuthGuard],
      },
      {
        path: 'premium',
        loadChildren: () =>
          import('./views/pages/payments/payments.module').then(
            (m) => m.PaymentsModule
          ),
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
    ],
  },
  {
    path: 'manage',
    component: ManageLayoutComponent,
    loadChildren: () =>
      import('./views/pages/manage/manage.module').then(
        (m) => m.ManageModule
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
