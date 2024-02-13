import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ICart, ICategory, IProduct, IProductPage, IUser } from '../../../model/model.interfaces';
import { PaginatorState } from 'primeng/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductAjaxService } from '../../../service/product.ajax.service';
import { SessionAjaxService } from '../../../service/session.ajax.service';
import { CartAjaxService } from '../../../service/cart.ajax.service';
import { PurchaseAjaxService } from '../../../service/purchase.ajax.service';
import { CategoryAjaxService } from '../../../service/category.ajax.service';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-product-plist-unrouted',
  templateUrl: './user-product-plist-unrouted.component.html',
  styleUrls: ['./user-product-plist-unrouted.component.css']
})
export class UserProductPlistUnroutedComponent implements OnInit {

  @Input() oForceReload: Subject<boolean> = new Subject<boolean>();
  @Input() oCategory_id: number = 0;

  oPage: IProductPage | undefined;
  oCategory: ICategory | null = null;
  oUser: IUser | null = null;
  oCart: ICart = { user: {}, product: {}, amount: 0 } as ICart;
  oOrderField: string = "id";
  oOrderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 15, page: 0, pageCount: 0 };
  oStatus: HttpErrorResponse | null = null;

  constructor(
    private oProductAjaxService: ProductAjaxService,
    private oSessionAjaxService: SessionAjaxService,
    private oCartAjaxService: CartAjaxService,
    private oPurchaseAjaxService: PurchaseAjaxService,
    private oCategoryAjaxService: CategoryAjaxService,
    private oConfirmService: ConfirmationService,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar,
    public oDialogService: DialogService,

  ) { }

  ngOnInit() {
    this.getPage();
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

  getPage() {
    this.oProductAjaxService.getPageProducts(this.oPaginatorState.rows, this.oPaginatorState.page, this.oOrderField, this.oOrderDirection, this.oCategory_id).subscribe({
      next: (data: IProductPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (response: HttpErrorResponse) => {
        this.oStatus = response;
      }
    });
  }

  getProducts(): void {
    this.oProductAjaxService.getPageProducts(this.oPaginatorState.rows || 0, this.oPaginatorState.page || 0, this.oOrderField, this.oOrderDirection, this.oCategory_id).subscribe({
      next: (data: IProductPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(data);

        const productosIds = this.oPage.content.map(product => product.id);
        const precios: { [id: number]: number} = {};

        productosIds.forEach(id => {
          this.oProductAjaxService.getProductPrice(id).subscribe({
            next: (precio: number) => {
              precios[id] = precio;

              if (Object.keys(precios).length === productosIds.length) {
                this.oPage?.content.forEach(product => {
                  product.price = precios[product.id];
                });
              }
            },
            error: (err: HttpErrorResponse) => {
              this.oStatus = err;
            }
          });
        });
      },
      error: (err: HttpErrorResponse) => {
        this.oStatus = err;
      }
    })
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getProducts();
  }

  getCategory(): void {
    this.oCategoryAjaxService.getCategoryById(this.oCategory_id).subscribe({
      next: (data: ICategory) => {
        this.oCategory = data;
        this.getProducts();
      },
      error: (err: HttpErrorResponse) => {
        this.oStatus = err;
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

  buyDirectly(product: IProduct): void {
    this.oSessionAjaxService.getSessionUser()?.subscribe({
      next: (user : IUser) => {
        if (user) {
          this.oConfirmService.confirm({
            message: '¿Desea comprar el producto?',
            accept: () => {
              const amount = 1;
              this.oPurchaseAjaxService.createPurchaseProduct(product.id, user.id, amount).subscribe({
                next: () => {
                  this.oMatSnackBar.open('Porducto comprado', 'Aceptar', { duration: 3000 });
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
          })
        } else {
          this.oMatSnackBar.open('Debe iniciar sesión para comprar', 'Aceptar', { duration: 3000 });
        };
      },
      error: (err: HttpErrorResponse) => {
        this.oStatus = err;
        this.oMatSnackBar.open('Error al obtener el usuario', 'Aceptar', { duration: 3000 });
      }
    });
  }

}
