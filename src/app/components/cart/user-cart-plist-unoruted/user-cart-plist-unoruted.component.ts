import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ICart, ICartPage, IProduct, IPurchase, IUser } from '../../../model/model.interfaces';
import { PaginatorState } from 'primeng/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { CartAjaxService } from '../../../service/cart.ajax.service';
import { SessionAjaxService } from '../../../service/session.ajax.service';
import { PurchaseAjaxService } from '../../../service/purchase.ajax.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { error } from 'console';

@Component({
  selector: 'app-user-cart-plist-unoruted',
  templateUrl: './user-cart-plist-unoruted.component.html',
  styleUrls: ['./user-cart-plist-unoruted.component.css']
})
export class UserCartPlistUnorutedComponent implements OnInit {

  @Input() oForceReload: Subject<boolean> = new Subject<boolean>();

  oPage: ICartPage | undefined;
  oUser: IUser | null = null;
  oProduct: IProduct | null = null;
  oCart: ICart = { user: {}, product: {}, amount: 0 } as ICart;
  oTotalPrice: number = 0;
  oOrderField: string = 'id';
  oOrderDirection: string = 'asc';
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  oStatus: HttpErrorResponse | null = null;
  oPriceIndividualMap: Map<number, number> = new Map<number, number>();

  constructor(
    private oCartAjaxService: CartAjaxService,
    private oSessionAjaxService: SessionAjaxService,
    private oPurchaseAjaxService: PurchaseAjaxService,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar,
    private oConfirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.getCarts();
    this.oForceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getCarts();
        }
      }
    });
  }

  getCarts(): void {
    this.oSessionAjaxService.getSessionUser()?.subscribe({
      next: (user : IUser) => {
        this.oUser = user;
        this.oCartAjaxService.getCartByUserId(this.oUser.id, this.oPaginatorState.rows ?? 0, this.oPaginatorState.page ?? 0, this.oOrderField, this.oOrderDirection).subscribe({
          next: (page: ICartPage) => {
            this.oPage = page;
            this.oPaginatorState.pageCount = this.oPage.totalPages;
            this.oPage.content.forEach((cart: ICart) => {
              this.getPriceCart(cart);
            })
            this.updateTotalPrice();
          },
          error: (error: HttpErrorResponse) => {
            this.oStatus = error;
            this.oMatSnackBar.open('Error al recuperar los carritos', 'Aceptar', {duration: 3000})
          }
        });
      }
    });
  }

  getPriceCart(cart: ICart): void {
    const oPriceProduct = cart.product.price;
    const oAmount = cart.amount;
    const oPriceIndividual = oPriceProduct * oAmount;
    this.oPriceIndividualMap.set(cart.id, oPriceIndividual);
  }

  updateAmount(cart: ICart, newAmount: number): void {
    cart.user = {id: cart.user.id } as IUser;
    cart.product = { id: cart.product.id } as IProduct;
    cart.amount = newAmount;
    if ( newAmount == 0) {
      this.deleteFromCart(cart.id)
    } else {
      this.oCartAjaxService.updateCart(cart).subscribe({
        next: (data: ICart) => {
          this.oMatSnackBar.open('Cantidad actualizada', 'Aceptar', { duration: 3000 });
          this.getPriceCart(data);
          this.updateTotalPrice();
          this.getCarts();
        },
        error: (error: HttpErrorResponse) => {
          this.oStatus = error;
          this.oMatSnackBar.open('Error al actualizar la cantidad', 'Aceptar', { duration: 3000 });
        }
      });
    }
  }

  updateTotalPrice(): void {
    this.oSessionAjaxService.getSessionUser()?.subscribe({
      next: (user: IUser) => {
        this.oUser = user;
        this.oCartAjaxService.getTotalCartCost(this.oUser.id).subscribe({
          next: (price: number) => {
            this.oTotalPrice = price;
          },
          error: (error: HttpErrorResponse) => {
            this.oStatus = error;
            this.oMatSnackBar.open('Error al recuperar el coste total', 'Aceptar', { duration: 3000 });
          }
        })
      }
    })
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getCarts();
  }

  purchaseOneCart(cartId: number) {
    this.oSessionAjaxService.getSessionUser()?.subscribe({
      next: (user: IUser) => {
        this.oUser = user;
        this.oConfirmationService.confirm({
          message: '¿Desea comprar este carrito?',
          accept: () => {
            this.oPurchaseAjaxService.makeSingleCartPurchase(user.id, cartId).subscribe({
              next: (purchase: IPurchase) => {
                this.oMatSnackBar.open('Compra realizada', 'Aceptar', { duration: 3000 });
                this.oRouter.navigate(['/user', 'purchase', 'view', purchase.id]);
              },
              error: (error: HttpErrorResponse)=> {
                this.oStatus = error;
                this.oMatSnackBar.open('Error al realizar la compra', 'Aceptar', { duration: 3000 });
              }
            });
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        this.oStatus = error;
        this.oMatSnackBar.open('Error al recuperar el usuario', 'Aceptar', {duration: 3000});
      }
    });
  }

  purchaseAllCarts() {
    this.oSessionAjaxService.getSessionUser()?.subscribe({
      next: (user: IUser) => {
        this.oUser = user;
        this.oConfirmationService.confirm({
          message: '¿Desea comprar todos los carritos?',
          accept: () => {
            this.oPurchaseAjaxService.makeAllCartPurchase(user.id).subscribe({
              next: (purchase: IPurchase) => {
                this.oMatSnackBar.open('Compra realizada', 'Aceptar', { duration: 3000 });
                this.oRouter.navigate(['/user', 'purchase', 'view', purchase.id]);
              },
              error: (error: HttpErrorResponse) => {
                this.oStatus = error;
                this.oMatSnackBar.open('Error al realizar la compra', 'Aceptar', { duration: 3000 })
              }
            });
          }
        });
      },
      error: (error: HttpErrorResponse) => {
        this.oStatus = error;
        this.oMatSnackBar.open('Error al recuperar el usuario', 'Aceptar', {duration: 3000});
      }
    });
  }

  deleteFromCart(cartId: number): void {
    this.oConfirmationService.confirm({
      message: '¿Desea eliminar este carrito?',
      accept: () => {
        this.oCartAjaxService.deleteCart(cartId).subscribe({
          next: () => {
            this.oMatSnackBar.open('Carrito eliminado', 'Aceptar', { duration: 3000});
            this.getCarts();
          },
          error: (error: HttpErrorResponse) => {
            this.oStatus = error;
            this.oMatSnackBar.open('Error al eliminar el carrito', 'Aceptar', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteAllCarts(userId: number): void {
    this.oConfirmationService.confirm({
      message: '¿Deae aliminar todos los carritos?',
      accept: () => {
        this.oCartAjaxService.deleteCartByUser(userId).subscribe({
          next: () => {
            this.oMatSnackBar.open('Carritos eliminados', 'Aceptar', { duration: 3000 });
            this.getCarts();
          },
          error: (error: HttpErrorResponse) => {
            this.oStatus = error;
            this.oMatSnackBar.open('Error al eliminar los carritos', 'Aceptar', { duration: 3000 });
          }
        });
      }
    });
  }

}
