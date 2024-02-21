import { Component, Input, OnInit, Optional } from '@angular/core';
import { ICart, IProduct, IUser } from '../../../model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductAjaxService } from '../../../service/product.ajax.service';
import { SessionAjaxService } from '../../../service/session.ajax.service';
import { CartAjaxService } from '../../../service/cart.ajax.service';
import { PurchaseAjaxService } from '../../../service/purchase.ajax.service';
import { NavigationEnd, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';
import { UserAjaxService } from '../../../service/user.ajax.service';

@Component({
  selector: 'app-user-product-detail-unrouted',
  templateUrl: './user-product-detail-unrouted.component.html',
  styleUrls: ['./user-product-detail-unrouted.component.css']
})
export class UserProductDetailUnroutedComponent implements OnInit {

  @Input() oForceReload: Subject<boolean> = new Subject<boolean>();
  @Input() id: number = 0;
  oProduct: IProduct = {} as IProduct;
  oUser: IUser | null = null;
  oCart: ICart = { user: {}, product: {}, amount: 0 } as ICart;
  oAmountSelected: number = 1;
  oStatus: HttpErrorResponse | null = null;
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  oOrderField: string = 'id';
  oOrderDirection: string = 'asc';

  oUsername: string = '';
  oUserSession: IUser | null = null;

  oUrl: string = '';


  constructor(
    private oProductAjaxService: ProductAjaxService,
    private oSessionAjaxService: SessionAjaxService,
    private oUserAjaxService: UserAjaxService,
    private oCartAjaxService: CartAjaxService,
    private oPurchaseAjaxService: PurchaseAjaxService,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar,
    private oConfirmService: ConfirmationService,
    public oDialogService: DialogService,
    @Optional() public ref: DynamicDialogRef,
    @Optional() public config: DynamicDialogConfig
  ) {
    if (config && config.data) {
      this.id = config.data.id;
    }
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
    this.getProduct();
    this.getUser();
  }

  getOne(): void {
    this.oProductAjaxService.getProductById(this.id).subscribe({
      next: (data: IProduct) => {
        this.oProduct = data;
      },
      error: (err: HttpErrorResponse) => {
        this.oStatus = err;
      }
    });
  }

  getProduct() {
    this.oProductAjaxService.getProductById(this.id).subscribe({
      next: (data: IProduct) => {
        this.oProduct = data;
      },
      error: (err: HttpErrorResponse) => {
        this.oStatus = err;
      }
    })
  }

  getUser() {
    this.oSessionAjaxService.getSessionUser()?.subscribe({
      next: (data: IUser) => {
        this.oUser = data;
      },
      error: (err: HttpErrorResponse) => {
        this.oStatus = err;
      }
    })
  }

  addToCart(): void {
    if (this.oSessionAjaxService.isSessionActive()) {
      this.oCart.user = { username: this.oSessionAjaxService.getUsername() } as IUser;
      this.oCart.product = { id: this.oProduct.id } as IProduct;
      this.oCart.amount = this.oAmountSelected;
      this.oCartAjaxService.createCart(this.oCart).subscribe({
        next: (data: ICart) => {
          this.oCart = data;
          this.oMatSnackBar.open('Producto añadida al carrito', 'Aceptar', { duration: 3000 });
          this.oRouter.navigate(['/user', 'cart', 'plist']);
        },
        error: (err: HttpErrorResponse) => {
          this.oStatus = err;
          this.oMatSnackBar.open('Error al añadir el producto al carrito', 'Aceptar', { duration: 3000 });
        }
      });
    }
  }

  buyDirectly(): void {
    if (this.oUser) {
      const userId = this.oUser.id;
      this.oConfirmService.confirm({
        message: `¿Quieres comprar ${this.oAmountSelected} producto(s)?`,
        accept: () => {
          this.oPurchaseAjaxService.makeProductPurchase(this.oProduct.id, userId, this.oAmountSelected).subscribe({
            next: () => {
              this.oMatSnackBar.open(`Has comprado ${this.oAmountSelected} producto(s)`, 'Aceptar', { duration: 3000 });
              this.oRouter.navigate(['/user', 'purchase', 'plist', userId]);
            }
          });
        },
        reject: () => {
          this.oMatSnackBar.open('Compra cancelada', 'Aceptar', { duration: 3000 });
        }
      });
    } else {
      this.oMatSnackBar.open('Debes estar logueado para comprar productos', 'Aceptar', { duration: 3000 });
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    // Verificar si la tecla presionada no es una flecha hacia arriba o abajo
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
      event.preventDefault(); // Prevenir la acción predeterminada (escribir el valor)
    }
  }
}