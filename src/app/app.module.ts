import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// --
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// --
import { HttpClientModule } from '@angular/common/http';
// --
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// --
// INTERCEPTOR
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
// --
// SHARED COMPONENTS
import { MenuUnroutedComponent } from './components/shared/menu-unrouted/menu-unrouted.component';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { FooterRoutedComponent } from './components/shared/footer-routed/footer-routed.component';
// --
// SERVICES
import { CryptoService } from './service/crypto.service';
import { MediaService } from './service/media.service';
import { ProductAjaxService } from './service/product.ajax.service';
import { SessionAjaxService } from './service/session.ajax.service';
import { UserAjaxService } from './service/user.ajax.service';
// --


//--
@NgModule({
  declarations: [
    AppComponent,
    //SHARED COMPONENTS
    MenuUnroutedComponent,
    LogoutRoutedComponent,
    LoginRoutedComponent,
    HomeRoutedComponent,
    FooterRoutedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    // SERVICES
    CryptoService,
    MediaService,
    ProductAjaxService,
    SessionAjaxService,
    UserAjaxService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }