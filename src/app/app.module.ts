import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './views/layouts/footer/footer.component';
import { HeaderComponent } from './views/layouts/header/header.component';
import { LoginComponent } from './views/pages/auth/login/login.component';
import { RegisterComponent } from './views/pages/auth/register/register.component';
import { ForgotPasswordComponent } from './views/pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/pages/auth/reset-password/reset-password.component';
import { NotFoundComponent } from './views/pages/not-found/not-found.component';
import { ContactComponent } from './views/pages/contact/contact.component';
import { HomeComponent } from './views/pages/home/home.component';
import { ComponentsModule } from './views/components/components.module';
import { RentalNewsComponent } from './views/pages/rental-news/rental-news.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/noauth.guard';
import { NgxSummernoteModule } from 'ngx-summernote';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PromotionsComponent } from './views/pages/promotions/promotions.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditRentalComponent } from './views/pages/my-account/edit-rental/edit-rental.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    ContactComponent,
    HomeComponent,
    RentalNewsComponent,
    PromotionsComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    EditRentalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 3000, // 2 seconds
      progressBar: true,
    }),
    ComponentsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxSummernoteModule,
    NgxDropzoneModule,
    NgbModule,
  ],
  providers: [AuthGuard, NoAuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
