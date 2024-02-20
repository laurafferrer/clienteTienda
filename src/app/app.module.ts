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
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

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
// ADMIN USER COMPONENTS
import { AdminUserFormUnroutedComponent } from './components/user/admin-user-form-unrouted/admin-user-form-unrouted.component';
import { AdminUserPlistRoutedComponent } from './components/user/admin-user-plist-routed/admin-user-plist-routed.component'; 
import { AdminUserPlistUnroutedComponent } from './components/user/admin-user-plist-unrouted/admin-user-plist-unrouted.component'; 
import { AdminUserDetailUnroutedComponent } from './components/user/admin-user-detail-unrouted/admin-user-detail-unrouted.component'; 
import { AdminUserNewRoutedComponent } from './components/user/admin-user-new-routed/admin-user-new-routed.component'; 
import { AdminUserEditRoutedComponent } from './components/user/admin-user-edit-routed/admin-user-edit-routed.component';
import { AdminUserSelectionUnroutedComponent } from './components/user/admin-user-selection-unrouted/admin-user-selection-unrouted.component';
import { AdminUserViewRoutedComponent } from './components/user/admin-user-view-routed/admin-user-view-routed.component';
// USER USER COMPONENTS
import { UserUserDetailUnroutedComponent } from './components/user/user-user-detail-unrouted/user-user-detail-unrouted.component';
import { UserUserViewRoutedComponent } from './components/user/user-user-view-routed/user-user-view-routed.component';
// --
// ADMIN PRODUCT COMPONENTS
import { AdminProductFormUnroutedComponent } from './components/product/admin-product-form-unrouted/admin-product-form-unrouted.component';
import { AdminProductPlistRoutedComponent } from './components/product/admin-product-plist-routed/admin-product-plist-routed.component';
import { AdminProductPlistUnroutedComponent } from './components/product/admin-product-plist-unrouted/admin-product-plist-unrouted.component';
import { AdminProductDetailUnroutedComponent } from './components/product/admin-product-detail-unrouted/admin-product-detail-unrouted.component';
import { AdminProductNewRoutedComponent } from './components/product/admin-product-new-routed/admin-product-new-routed.component';
import { AdminProductEditRoutedComponent } from './components/product/admin-product-edit-routed/admin-product-edit-routed.component';
import { AdminProductSelectionUnroutedComponent } from './components/product/admin-product-selection-unrouted/admin-product-selection-unrouted.component';
import { AdminProductViewRoutedComponent } from './components/product/admin-product-view-routed/admin-product-view-routed.component';
// USER PRODUCT COMPONENTS
import { UserProductDetailUnroutedComponent} from './components/product/user-product-detail-unrouted/user-product-detail-unrouted.component';
import { UserProductPlistRoutedComponent } from './components/product/user-product-plist-routed/user-product-plist-routed.component';
import { UserProductPlistUnroutedComponent } from './components/product/user-product-plist-unrouted/user-product-plist-unrouted.component';
import { UserProductViewRoutedComponent } from './components/product/user-product-view-routed/user-product-view-routed.component';
// --
// ADMIN CATEGORY COMPONENTS
import { AdminCategoryFormUnroutedComponent } from './components/category/admin-category-form-unrouted/admin-category-form-unrouted.component';
import { AdminCategoryPlistRoutedComponent } from './components/category/admin-category-plist-routed/admin-category-plist-routed.component';
import { AdminCategoryPlistUnroutedComponent } from './components/category/admin-category-plist-unrouted/admin-category-plist-unrouted.component';
import { AdminCategoryDetailUnroutedComponent } from './components/category/admin-category-detail-unrouted/admin-category-detail-unrouted.component';
import { AdminCategoryNewRoutedComponent } from './components/category/admin-category-new-routed/admin-category-new-routed.component';
import { AdminCategoryEditRoutedComponent } from './components/category/admin-category-edit-routed/admin-category-edit-routed.component';
import { AdminCategorySelectionUnroutedComponent } from './components/category/admin-category-selection-unrouted/admin-category-selection-unrouted.component';
import { AdminCategoryViewRoutedComponent } from './components/category/admin-category-view-routed/admin-category-view-routed.component';
// USER CATEGORY COMPONENTS
import { UserCategoryPlistRoutedComponent } from './components/category/user-category-plist-routed/user-category-plist-routed.component';
import { UserCategoryPlistUnroutedComponent } from './components/category/user-category-plist-unrouted/user-category-plist-unrouted.component';
// --
// -- USER CART COMPONENTS
import { UserCartPlistUnorutedComponent } from './components/cart/user-cart-plist-unoruted/user-cart-plist-unoruted.component';
import { UserCartPlistRoutedComponent } from './components/cart/user-cart-plist-routed/user-cart-plist-routed.component';
// --
// -- ADMIN PURCHASE COMPONENTS
import { AdminPurchaseDetailUnroutedComponent } from './components/purchase/admin-purchase-detail-unrouted/admin-purchase-detail-unrouted.component';
import { AdminPurchasePlistUnroutedComponent } from './components/purchase/admin-purchase-plist-unrouted/admin-purchase-plist-unrouted.component';
// -- USER PURCHASE COMPONENTS
import { UserPurchaseDetailUnroutedComponent} from './components/purchase/user-purchase-detail-unrouted/user-purchase-detail-unrouted.component';
import { UserPurchasePlistRoutedComponent } from './components/purchase/user-purchase-plist-routed/user-purchase-plist-routed.component';
import { UserPurchasePlistUnroutedComponent } from './components/purchase/user-purchase-plist-unrouted/user-purchase-plist-unrouted.component';
import { UserPurchaseViewRoutedComponent } from './components/purchase/user-purchase-view-routed/user-purchase-view-routed.component';
// --
// -- ADMIN PURCHASE DETAIL COMPONENTS
import { AdminPurchaseDetailDetailUnroutedComponent } from './components/purchaseDetail/admin-purchaseDetail-detail-unrouted/admin-purchaseDetail-detail-unrouted.component';
import { AdminPurchaseDetailPlistUnroutedComponent } from './components/purchaseDetail/admin-purchaseDetail-plist-unrouted/admin-purchaseDetail-plist-unrouted.component';
// -- USER PURCHASE DETAIL COMPONENTS
import { UserPurchaseDetailPlistUnroutedComponent } from './components/purchaseDetail/user-purchaseDetail-plist-unrouted/user-purchaseDetail-plist-unrouted.component';

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
    // ADMIN USER COMPONENTS
    AdminUserFormUnroutedComponent,
    AdminUserPlistRoutedComponent,
    AdminUserPlistUnroutedComponent,
    AdminUserDetailUnroutedComponent,
    AdminUserNewRoutedComponent,
    AdminUserEditRoutedComponent,
    AdminUserSelectionUnroutedComponent,
    AdminUserViewRoutedComponent,
    // USER USER COMPONENTS
    UserUserDetailUnroutedComponent,
    UserUserViewRoutedComponent,
    // ADMIN PRODUCT COMPONENTS
    AdminProductFormUnroutedComponent,
    AdminProductPlistRoutedComponent,
    AdminProductPlistUnroutedComponent,
    AdminProductDetailUnroutedComponent,
    AdminProductNewRoutedComponent,
    AdminProductEditRoutedComponent,
    AdminProductSelectionUnroutedComponent,
    AdminProductViewRoutedComponent,
    // USER PRODUCT COMPONENTS
    UserProductDetailUnroutedComponent,
    UserProductPlistRoutedComponent,
    UserProductPlistUnroutedComponent,
    UserProductViewRoutedComponent,
    // ADMIN CATEGORY COMPONENTS
    AdminCategoryFormUnroutedComponent,
    AdminCategoryPlistRoutedComponent,
    AdminCategoryPlistUnroutedComponent,
    AdminCategoryDetailUnroutedComponent,
    AdminCategoryNewRoutedComponent,
    AdminCategoryEditRoutedComponent,
    AdminCategorySelectionUnroutedComponent,
    AdminCategoryViewRoutedComponent,
    // USER CATEGORY COMPONENTS
    UserCategoryPlistRoutedComponent,
    UserCategoryPlistUnroutedComponent,
    // USER CART COMPONENTS
    UserCartPlistUnorutedComponent,
    UserCartPlistRoutedComponent,
    // ADMIN PURCHASE COMPONENTS
    AdminPurchaseDetailUnroutedComponent,
    AdminPurchasePlistUnroutedComponent,
    // USER PURCHASE COMPONENTS
    UserPurchaseDetailUnroutedComponent,
    UserPurchasePlistRoutedComponent,
    UserPurchasePlistUnroutedComponent,
    UserPurchaseViewRoutedComponent,
    // ADMIN PURCHASE DETAIL COMPONENTS
    AdminPurchaseDetailDetailUnroutedComponent,
    AdminPurchaseDetailPlistUnroutedComponent,
    // USER PURCHASE DETAIL COMPONENTS
    UserPurchaseDetailPlistUnroutedComponent,
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
    ConfirmPopupModule,
    ButtonModule,
    ToastModule
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
    DialogService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }