import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './views/layouts/footer/footer.component';
import { HeaderComponent } from './views/layouts/header/header.component';
import { LoginComponent } from './views/pages/auth/login/login.component';
import { RegisterComponent } from './views/pages/auth/register/register.component';
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
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
