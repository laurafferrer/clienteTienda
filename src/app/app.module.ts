import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { FooterUnroutedComponent } from './components/shared/footer-unrouted/footer-unrouted.component';
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
import { MenuUnroutedComponent } from './components/shared/menu-unrouted/menu-unrouted.component';
// --
// SERVICES
import { CartAjaxService } from './service/cart.ajax.service';
import { CategoryAjaxService } from './service/category.ajax.service';
import { CryptoService } from './service/crypto.service';
import { MediaService } from './service/media.service';
import { ProductAjaxService } from './service/product.ajax.service';
import { PurchaseAjaxService } from './service/purchase.ajax.service';
import { PurchaseDetailAjaxService } from './service/purchaseDetail.ajax.service';
import { SessionAjaxService } from './service/session.ajax.service';
import { UserAjaxService } from './service/user.ajax.service';
// --


//--
@NgModule({
  declarations: [
    AppComponent,
    //SHARED COMPONENTS
    FooterUnroutedComponent,
    HomeRoutedComponent,
    LoginRoutedComponent,
    LogoutRoutedComponent,
    MenuUnroutedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [
    MatSnackBar,
    // SERVICES
    CartAjaxService,
    CategoryAjaxService,
    CryptoService,
    MediaService,
    ProductAjaxService,
    PurchaseAjaxService,
    PurchaseDetailAjaxService,
    SessionAjaxService,
    UserAjaxService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }