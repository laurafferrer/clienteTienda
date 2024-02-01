import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PaginatorModule } from 'primeng/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
// USER COMPONENTS
import { AdminUserFormUnroutedComponent } from './components/user/admin-user-form-unrouted/admin-user-form-unrouted.component';
import { AdminUserPlistRoutedComponent } from './components/user/admin-user-plist-routed/admin-user-plist-routed.component'; 
import { AdminUserPlistUnroutedComponent } from './components/user/admin-user-plist-unrouted/admin-user-plist-unrouted.component'; 
import { AdminUserDetailUnroutedComponent } from './components/user/admin-user-detail-unrouted/admin-user-detail-unrouted.component'; 
import { AdminUserNewRoutedComponent } from './components/user/admin-user-new-routed/admin-user-new-routed.component'; 
import { AdminUserEditRoutedComponent } from './components/user/admin-user-edit-routed/admin-user-edit-routed.component';
import { AdminUserSelectionUnroutedComponent } from './components/user/admin-user-selection-unrouted-component/admin-user-selection-unrouted-component';

//--
@NgModule({
  declarations: [
    AppComponent,
    // SHARED COMPONENTS
    FooterUnroutedComponent,
    HomeRoutedComponent,
    LoginRoutedComponent,
    LogoutRoutedComponent,
    MenuUnroutedComponent,
    // USER COMPONENTS
    AdminUserFormUnroutedComponent,
    AdminUserPlistRoutedComponent,
    AdminUserPlistUnroutedComponent,
    AdminUserDetailUnroutedComponent,
    AdminUserNewRoutedComponent,
    AdminUserEditRoutedComponent,
    AdminUserSelectionUnroutedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    PaginatorModule,
    MatProgressSpinnerModule,
    ConfirmPopupModule
  ],
  providers: [
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