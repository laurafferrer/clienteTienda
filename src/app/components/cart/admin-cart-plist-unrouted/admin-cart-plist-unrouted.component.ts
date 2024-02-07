import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ICart, ICartPage, IProduct, IUser } from '../../../model/model.interfaces';
import { PaginatorState } from 'primeng/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAjaxService } from '../../../service/user.ajax.service';
import { ProductAjaxService } from '../../../service/product.ajax.service';
import { CartAjaxService } from '../../../service/cart.ajax.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminCartDetailUnroutedComponent } from '../admin-cart-detail-unrouted/admin-cart-detail-unrouted.component';

@Component({
  selector: 'app-admin-cart-plist-unrouted',
  templateUrl: './admin-cart-plist-unrouted.component.html',
  styleUrls: ['./admin-cart-plist-unrouted.component.css']
})
export class AdminCartPlistUnroutedComponent implements OnInit {

  @Input() oForceReload: Subject<boolean> = new Subject<boolean>();
  @Input() oIdUser: number = 0;
  @Input() oIdProduct: number = 0;

  oPage: ICartPage | undefined;
  oUser: IUser | null = null;
  oProduct: IProduct | null = null;
  oOrderField: string = 'id';
  oOrderDirection: string = 'asc';
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  oStatus: HttpErrorResponse | null = null;
  oCartToRemove: ICart | null = null;

  constructor(
    private oUserAjaxService: UserAjaxService,
    private oProductAjaxService: ProductAjaxService,
    private oCartAjaxService: CartAjaxService,
    public oDialogService: DialogService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    if (this.oIdUser > 0) {
      this.getUser();
    }
    if (this.oIdProduct > 0) {
      this.getProduct();
    }
    this.oForceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    });
  }

  getPage(): void {
    this.oCartAjaxService.getCartsPage(this.oPaginatorState.rows ?? 0, this.oPaginatorState.page ?? 0, this.oOrderField, this.oOrderDirection).subscribe ({
      next: (data: ICartPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.oStatus = error;
      }
    });
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(orderField: string) {
    this.oOrderField = orderField;
    if (this.oOrderDirection == "asc") {
      this.oOrderDirection = "desc";
    } else {
      this.oOrderDirection = "asc";
    }
    this.getPage();
  }

  doView(cart: ICart) {
    let ref: DynamicDialogRef | undefined;
    ref = this.oDialogService.open(AdminCartDetailUnroutedComponent, {
      data: {
        id: cart.id
      },
      header: "Detail of cart",
      width: "70%",
      height: "70%",
      maximizable: false
    });
  }

  doRemove(cart: ICart) {
    this.oCartToRemove = cart;
    this.oConfirmationService.confirm({
      accept: () => { 
        this.oCartAjaxService.deleteCart(cart.id).subscribe({
          next: () => {
            this.getPage();
            this.oMatSnackBar.open('Cart has been removed', 'Close', { duration: 2000 });
          },
          error: (error: HttpErrorResponse) => {
            this.oStatus = error;
            this.oMatSnackBar.open('Error removing cart', 'Close', { duration: 2000 });
          }
        });
      }
    });
  }

  getUser(): void {
    this.oUserAjaxService.getUserById(this.oIdUser).subscribe({
      next: (data: IUser) => {
        this.oUser = data;
        this.getPage();
      },
      error: (error: HttpErrorResponse) => {
        this.oStatus = error;
      }
    });
  }

  getProduct(): void { 
    this.oProductAjaxService.getProductById(this.oIdProduct).subscribe({
      next: (data: IProduct) => {
        this.oProduct = data;
        this.getPage();
      },
      error: (error: HttpErrorResponse) => {
        this.oStatus = error;
      }
    });
  }

}
