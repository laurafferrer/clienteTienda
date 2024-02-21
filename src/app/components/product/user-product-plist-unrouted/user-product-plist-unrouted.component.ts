import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ICart, ICategory, ICategoryPage, IProduct, IProductPage, IPurchase, IUser } from '../../../model/model.interfaces';
import { PaginatorState } from 'primeng/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductAjaxService } from '../../../service/product.ajax.service';
import { SessionAjaxService } from '../../../service/session.ajax.service';
import { CartAjaxService } from '../../../service/cart.ajax.service';
import { PurchaseAjaxService } from '../../../service/purchase.ajax.service';
import { CategoryAjaxService } from '../../../service/category.ajax.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserAjaxService } from '../../../service/user.ajax.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-user-product-plist-unrouted',
  templateUrl: './user-product-plist-unrouted.component.html',
  styleUrls: ['./user-product-plist-unrouted.component.css']
})
export class UserProductPlistUnroutedComponent implements OnInit {

  @Input() oForceReload: Subject<boolean> = new Subject<boolean>();
  @Input() oCategory_id: number = 0;

  oPage: IProductPage | undefined;
  oPaginatorState: PaginatorState = { first: 0, rows: 20, page: 0, pageCount: 0 };
  oValue: string = "";
  oStatus: HttpErrorResponse | null = null;
  oOrderField: string = "id";
  oOrderDirection: string = "asc";
  oPurchase: IPurchase | null = null;
  oProducts: IProduct[] = [];
  oProduct: IProduct = {} as IProduct;
  oProductSelected: IProduct[] = [];
  oProductToRemove: IProduct | null = null;
  oProductsPorPage: number = 10;
  oCategory: ICategory | null = null;
  oCategories: ICategory[] = [];
  oIdCategoryFind: number | null = null;
  oFindByCategory: boolean = false;
  oRef: DynamicDialogRef | undefined;
  strUserName: String = "";
  oUsername : String = "";
  oUserSession: IUser | null = null;
  oCart: ICart = { user: {}, product: {}, amount: 0 } as ICart; 
  oQuantitySelected: number = 1; 

  oUrl: string = '';

  constructor(
    private oProductAjaxService: ProductAjaxService,
    private oCartAjaxService: CartAjaxService,
    private oSessionAjaxService: SessionAjaxService,
    private oPurchaseAjaxService: PurchaseAjaxService,
    private oCategoryAjaxService: CategoryAjaxService,
    private oUserAjaxService: UserAjaxService,
    private oConfirmService: ConfirmationService,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar,
    public oDialogService: DialogService,

  ) {
    this.oRouter.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.oUrl = ev.url;
      }
    })

    this.oUsername = oSessionAjaxService.getUsername();
    this.oUserAjaxService.getUserByUsername(this.oSessionAjaxService.getUsername()).subscribe({
      next: (user: IUser) => {
        this.oUserSession = user;
        console.log('User Session:', this.oUserSession); // Agrega este log
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
   }

  ngOnInit() {
    this.strUserName = this.oSessionAjaxService.getUsername();
    this.getPage();
    this.getCategories();
    if (this.oCategory_id > 0) {
      this.getCategory();
    }

    this.oForceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    });
  }

  removeFilter(): void {
    this.oValue = '';

    this.oProductAjaxService.getPageProducts(this.oPaginatorState.rows, this.oPaginatorState.page, this.oOrderField, this.oOrderDirection, 0).subscribe({
      next: (data: IProductPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        this.oProducts = data.content;
      },
      error: (response: HttpErrorResponse) => {
        this.oStatus = response;
      }
    });

    this.oCategory_id = 0;
    this.oFindByCategory = false;
  }

  onInputChange(query: string): void {
    if (query.length > 2) {
      this.oProductAjaxService.getPageProducts(this.oPaginatorState.rows, this.oPaginatorState.page, this.oOrderField, this.oOrderDirection, this.oCategory_id, query).subscribe({
        next: (data: IProductPage) => {
          this.oPage = data;
          this.oProducts = data.content;
          this.oPaginatorState.pageCount = data.totalPages;
        },
        error: (response: HttpErrorResponse) => {
          this.oStatus = response;
        }
      });
    } else {
      this.getPage();
    }
  }

  
  getPage() {
    this.oProductAjaxService.getPageProducts(this.oPaginatorState.rows, this.oPaginatorState.page, this.oOrderField, this.oOrderDirection, this.oCategory_id).subscribe({
      next: (data: IProductPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        this.oProducts = data.content;
      },
      error: (response: HttpErrorResponse) => {
        this.oStatus = response;
      }
    });
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(fieldOrder: string) {
    this.oOrderField = fieldOrder;
    this.oOrderDirection = this.oOrderDirection === 'asc' ? 'desc' : 'asc';
    this.getPage();
  }

  getCategory(): void {
    this.oCategoryAjaxService.getCategoryById(this.oCategory_id).subscribe({
      next: (data: ICategory) => {
        this.oCategory = data;
      },
      error: (err: HttpErrorResponse) => {
        this.oStatus = err;
      }
    });
  }

  getCategories(): void {
    this.oCategoryAjaxService.getPageCategory(undefined, undefined, 'id', 'asc').subscribe({
      next: (data: ICategoryPage) => {
        this.oCategories = data.content;
      },
      error: (err: HttpErrorResponse) => {
        console.log('Error al obtener las categorías', err);
      }
    });
  }

  addToCart(product: IProduct): void {
    if (this.oSessionAjaxService.isSessionActive()) {
      this.oCart.user = { username: this.oSessionAjaxService.getUsername() } as IUser;
      this.oCart.product = { id: product.id } as IProduct;
      this.oCart.amount = 1;
      this.oCartAjaxService.createCart(this.oCart).subscribe({
        next: (data: ICart) => {
          this.oCart = data;
          this.oMatSnackBar.open('Producto añadido al carrito', 'Aceptar', { duration: 3000 });
          this.oRouter.navigate(['/user', 'cart', 'plist']);
        },
        error: (err: HttpErrorResponse) => {
          this.oStatus = err;
          this.oMatSnackBar.open('Error al añadir el producto al carrito', 'Aceptar', { duration: 3000 });
        }
      });
    }
  }

  getTotalToPay(): number {
    const totalToPay = this.oProductSelected.reduce((total, product) => total + product.price, 0);
    return totalToPay;
  }

  doView(product: IProduct) {
    this.oRouter.navigate(['/user', 'product', 'view', product.id]);
  }

  makeProductPurchase(product: IProduct): void {
    this.oSessionAjaxService.getSessionUser()?.subscribe({
      next: (user: IUser) => {
        if (user) {
          this.oConfirmService.confirm({
            message: '¿Quieres comprar el producto?',
            accept: () => {
              const cantidad = 1;
              this.oPurchaseAjaxService.makeProductPurchase(product.id, user.id, cantidad).subscribe({
                next: () => {
                  this.oMatSnackBar.open('Producto comprado', 'Aceptar', { duration: 3000 });

                  // Navegar a la lista de compras del usuario actual
                  this.oRouter.navigate(['/user', 'purchase', 'plist', user.id]);
                },
                error: (err: HttpErrorResponse) => {
                  this.oStatus = err;
                  this.oMatSnackBar.open('Error al comprar el producto', 'Aceptar', { duration: 3000 });
                }
              });
            },
            reject: () => {
              this.oMatSnackBar.open('Compra cancelada', 'Aceptar', { duration: 3000 });
            }
          });
        } else {
          this.oMatSnackBar.open('Debes estar logueado para comprar productos', 'Aceptar', { duration: 3000 });
        };
      },
      error: (err: HttpErrorResponse) => {
        this.oStatus = err;
        this.oMatSnackBar.open('Error al obtener el usuario', 'Aceptar', { duration: 3000 });
      }
    });
  }

  findByCategory(idCategory: number): void {
    this.oCategory_id = idCategory;
    this.getPage();
    this.oIdCategoryFind = idCategory;
    this.oFindByCategory = true;
  }

}
