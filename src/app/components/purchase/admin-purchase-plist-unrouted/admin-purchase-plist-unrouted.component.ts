import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IPurchase, IPurchasePage, IUser } from '../../../model/model.interfaces';
import { PaginatorState } from 'primeng/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAjaxService } from '../../../service/user.ajax.service';
import { PurchaseAjaxService } from '../../../service/purchase.ajax.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminPurchaseDetailUnroutedComponent } from '../admin-purchase-detail-unrouted/admin-purchase-detail-unrouted.component';

@Component({
  selector: 'app-admin-purchase-plist-unrouted',
  templateUrl: './admin-purchase-plist-unrouted.component.html',
  styleUrls: ['./admin-purchase-plist-unrouted.component.css']
})
export class AdminPurchasePlistUnroutedComponent implements OnInit {

  @Input() oForceReload: Subject<boolean> = new Subject<boolean>();
  @Input() oIdUser: number = 0;

  oPage: IPurchasePage | undefined;
  oUser: IUser | null = null;
  oOrderField: string = "id";
  oOrderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  oStatus: HttpErrorResponse | null = null;
  oPurchaseToRemove: IPurchase | null = null;

  constructor(
    private oUserAjaxService: UserAjaxService,
    private oPurchaseAjaxService: PurchaseAjaxService,
    public oDialogService: DialogService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    if (this.oIdUser > 0) {
      this.getUser();
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
    this.oPurchaseAjaxService.getPagePurchases(this.oPaginatorState.rows || 0, this.oPaginatorState.page || 0, this.oOrderField, this.oOrderDirection, this.oIdUser).subscribe({
      next: (data: IPurchasePage) => {
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

  doOrder(fieldOrder: string) {
    this.oOrderDirection = fieldOrder;
    if (this.oOrderDirection == "asc") {
      this.oOrderDirection = "desc";
    } else {
      this.oOrderDirection = "asc";
    }
    this.getPage();
  }

  doView(purchase: IPurchase) {
    let ref: DynamicDialogRef | undefined;
    ref = this.oDialogService.open(AdminPurchaseDetailUnroutedComponent, {
      header: "Mostrando los detalles de la compra",
      width: '70%',
      maximizable: false,
      data: {
        id: purchase.id
      }
    });
  }

  doRemove(purchase: IPurchase) {
    this.oPurchaseToRemove = purchase;
    this.oConfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open('Cancelando la compra ${purchase.id}', "Borrando", {duration: 3000});
        this.oPurchaseAjaxService.deletePurchase(purchase.id).subscribe({
          next: () => {
            this.oMatSnackBar.open('Compra $(purchase.id) cancelada correctamente', "Aceptar", {duration: 3000});
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.oMatSnackBar.open('Error al cancelar la compra ${purchase.id}', "Aceptar", {duration: 3000});
            this.oStatus = error;
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("Se ha anulado la cancelación de la compra")
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

  getPurchaseByUser(): void {
    this.oPurchaseAjaxService.getPurchaseByUserId(this.oIdUser, this.oPaginatorState.page || 0, this.oPaginatorState.rows || 0, this.oOrderField, this.oOrderDirection).subscribe({
      next: (data: IPurchasePage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        this.getPage();
      },
      error: (error: HttpErrorResponse) => {
        this.oStatus = error;
      }
    });
  }

}
