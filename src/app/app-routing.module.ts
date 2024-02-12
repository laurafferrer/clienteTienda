import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// --
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { LogoutRoutedComponent } from './components/shared/logout-routed/logout-routed.component';
// -- ADMIN USER COMPONENTS
import { AdminUserPlistRoutedComponent } from './components/user/admin-user-plist-routed/admin-user-plist-routed.component';
import { AdminUserEditRoutedComponent } from './components/user/admin-user-edit-routed/admin-user-edit-routed.component';
import { AdminUserNewRoutedComponent } from './components/user/admin-user-new-routed/admin-user-new-routed.component';
import { AdminUserViewRoutedComponent } from './components/user/admin-user-view-routed/admin-user-view-routed.component';
// -- ADMIN PRODUCT COMPONENTS
import { AdminProductPlistRoutedComponent } from './components/product/admin-product-plist-routed/admin-product-plist-routed.component';
import { AdminProductEditRoutedComponent } from './components/product/admin-product-edit-routed/admin-product-edit-routed.component';
import { AdminProductNewRoutedComponent } from './components/product/admin-product-new-routed/admin-product-new-routed.component';
import { AdminProductViewRoutedComponent } from './components/product/admin-product-view-routed/admin-product-view-routed.component';
// -- ADMIN CATEGORY COMPONENTS
import { AdminCategoryPlistRoutedComponent } from './components/category/admin-category-plist-routed/admin-category-plist-routed.component';
import { AdminCategoryEditRoutedComponent } from './components/category/admin-category-edit-routed/admin-category-edit-routed.component';
import { AdminCategoryNewRoutedComponent } from './components/category/admin-category-new-routed/admin-category-new-routed.component';
import { AdminCategoryViewRoutedComponent } from './components/category/admin-category-view-routed/admin-category-view-routed.component';
// -- ADMIN CART COMPONENTS
import { UserCartPlistRoutedComponent } from './components/cart/user-cart-plist-routed/user-cart-plist-routed.component';
// -- ADMIN PURCHASE COMPONENTS
import { AdminPurchasePlistRoutedComponent } from './components/purchase/admin-purchase-plist-routed/admin-purchase-plist-routed.component';
import { AdminPurchaseViewRoutedComponent } from './components/purchase/admin-purchase-view-routed/admin-purchase-view-routed.component';


const routes: Routes = [
  { path: '', component: HomeRoutedComponent },
  { path: 'home', component: HomeRoutedComponent },
  { path: 'login', component: LoginRoutedComponent},
  { path: 'logout', component: LogoutRoutedComponent},
  
  { path: 'admin/user/plist', component: AdminUserPlistRoutedComponent},
  { path: 'admin/user/edit/:id', component: AdminUserEditRoutedComponent},
  { path: 'admin/user/new', component: AdminUserNewRoutedComponent},
  { path: 'admin/user/view/:id', component: AdminUserViewRoutedComponent},

  { path: 'admin/product/plist', component: AdminProductPlistRoutedComponent},
  { path: 'admin/product/edit/:id', component: AdminProductEditRoutedComponent},
  { path: 'admin/product/new', component: AdminProductNewRoutedComponent},
  { path: 'admin/product/view/:id', component: AdminProductViewRoutedComponent},
  { path: 'admin/product/plist/bycategory/:category_id', component: AdminProductPlistRoutedComponent}, 

  { path: 'admin/category/plist', component: AdminCategoryPlistRoutedComponent},
  { path: 'admin/category/edit/:id', component: AdminCategoryEditRoutedComponent},
  { path: 'admin/category/new', component: AdminCategoryNewRoutedComponent},
  { path: 'admin/category/view/:id', component: AdminCategoryViewRoutedComponent},

  { path: 'admin/cart/plist', component: UserCartPlistRoutedComponent},

  { path: 'admin/purchase/plist', component: AdminPurchasePlistRoutedComponent},
  { path: 'admin/purchase/view/:id', component: AdminPurchaseViewRoutedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }