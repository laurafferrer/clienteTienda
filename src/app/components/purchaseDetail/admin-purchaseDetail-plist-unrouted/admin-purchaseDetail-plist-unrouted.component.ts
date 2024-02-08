import { HttpErrorResponse } from '@angular/common/http';
import { IProduct, IPurchase, IPurchaseDetail, IPurchaseDetailPage } from './../../../model/model.interfaces';
import { Component, Input, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { PurchaseDetailAjaxService } from '../../../service/purchaseDetail.ajax.service';
import { PurchaseAjaxService } from '../../../service/purchase.ajax.service';
import { ProductAjaxService } from '../../../service/product.ajax.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminPurchaseDetailDetailUnroutedComponent } from '../admin-purchaseDetail-detail-unrouted/admin-purchaseDetail-detail-unrouted.component';

@Component({
  selector: 'app-admin-purchaseDetail-plist-unrouted',
  templateUrl: './admin-purchaseDetail-plist-unrouted.component.html',
  styleUrls: ['./admin-purchaseDetail-plist-unrouted.component.css']
})
export class AdminPurchaseDetailPlistUnroutedComponent implements OnInit {

  @Input() oForceReload: Subject<boolean> = new Subject<boolean>();
  @Input() oIdPurchase: number = 0;
  @Input() oIdProduct: number = 0;

  oPage: IPurchaseDetailPage | undefined;
  oPurchase: IPurchase | null = null;
  oProduct: IProduct | null = null;
  oOrderField: string = 'id';
  oOrderDirection: string = 'asc';
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  oStatus: HttpErrorResponse | null = null;
  oPurchaseDetailToRemove: IPurchaseDetail | null = null;

  constructor(
    private oPurchaseDetailAjaxService: PurchaseDetailAjaxService,
    private oPurchaseAjaxService: PurchaseAjaxService,
    private oProductAjaxService: ProductAjaxService,
    public oDialogService: DialogService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackbar: MatSnackBar
    
  ) { }

  ngOnInit() {
    this.getPage();
    if (this.oIdPurchase > 0 ) {
      this.getPurchase();
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
    this.oPurchaseDetailAjaxService.getPurchaseDetailPage(this.oPaginatorState.page || 0, this.oPaginatorState.rows || 0, this.oOrderField, this.oOrderDirection, this.oIdPurchase, this.oIdProduct).subscribe({
      next: (data: IPurchaseDetailPage) => {
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
    this.oOrderField = fieldOrder;
    if (this.oOrderDirection == "asc") {
      this.oOrderDirection = "desc";
    } else {
      this.oOrderDirection = "asc";
    }
    this.getPage();
  }

  doView(purchaseDetail: IPurchaseDetail) {
    let ref: DynamicDialogRef | undefined;
    ref = this.oDialogService.open(AdminPurchaseDetailDetailUnroutedComponent, {
      data: {
        id: purchaseDetail.id
      },
      header: "Detalle Compra",
      width: "70%",
      maximizable: false
    });
  }

  doRemove(purchaseDetail: IPurchaseDetail) {
    this.oPurchaseDetailToRemove = purchaseDetail;
    this.oConfirmationService.confirm({
      accept: () => {
        this.oMatSnackbar.open("Se ha eliminado el producto de la compra", "Aceptar", {duration: 2000});
        this.oPurchaseDetailAjaxService.deletePurchaseDetail(purchaseDetail.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.oStatus = error;
            this.oMatSnackbar.open("Error al eliminar el producto de la compra", "Aceptar", {duration: 2000});
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackbar.open("Se ha anulado la eliminación del producto de la compra", "Aceptar", {duration: 2000});
      }
    });
  }

  getPurchase(): void {
    this.oPurchaseAjaxService.getPurchaseById(this.oIdPurchase).subscribe({
      next: (data: IPurchase) => {
        this.oPurchase = data;
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
      },
      error: (error: HttpErrorResponse) => {
        this.oStatus = error;
      }
    });
  }

}
