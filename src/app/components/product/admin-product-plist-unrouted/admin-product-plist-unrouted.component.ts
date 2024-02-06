import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ProductAjaxService } from '../../../service/product.ajax.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IProduct, IProductPage } from '../../../model/model.interfaces';
import { Subject } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminProductDetailUnroutedComponent } from '../admin-product-detail-unrouted/admin-product-detail-unrouted.component';

@Component({
  providers: [DialogService, ConfirmationService],
  selector: 'app-admin-product-plist-unrouted',
  templateUrl: './admin-product-plist-unrouted.component.html',
  styleUrls: ['./admin-product-plist-unrouted.component.css']
})
export class AdminProductPlistUnroutedComponent implements OnInit {

  @Input() oForceReload:Subject<boolean> = new Subject<boolean>();

  oPage: IProductPage | undefined;
  oOrderField: string = "id";
  oOrderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  oStatus: HttpErrorResponse | null = null;
  oProductToDelete: IProduct | null = null;
  oProducts: IProduct[] = [];

  value: string = "";

  constructor(
    private oProductAjaxService: ProductAjaxService,
    public oDialogService: DialogService,
    private oConfirmationService : ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    this.oForceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    })
  }

  onInputChange(query: string): void { 
    if (query.length > 2) {
      this.oProductAjaxService.getPageProducts(this.oPaginatorState.rows, this.oPaginatorState.page, this.oOrderField, this.oOrderDirection, query).subscribe({
        next: (data: IProductPage) => {
          this.oPage = data;
          this.oProducts = data.content;
          this.oPaginatorState.pageCount = data.totalPages;
        },
        error: (error: HttpErrorResponse) => {
          this.oStatus = error;
        }
      });
    }
  }

  getPage() {
    this.oProductAjaxService.getPageProducts(this.oPaginatorState.rows, this.oPaginatorState.page, this.oOrderField, this.oOrderDirection).subscribe({
      next: (data: IProductPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
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
    this.oOrderDirection = this.oOrderDirection == "asc" ? "desc" : "asc";
    this.getPage();
  }

  doView(product: IProduct) {
    let ref: DynamicDialogRef | undefined;
    ref = this.oDialogService.open(AdminProductDetailUnroutedComponent, {
      header: 'Product Detail',
      width: '70%',
      maximizable: false,
      data: { id: product.id, ref }
    });
  }

  doRemove(product: IProduct) {
    this.oProductToDelete = product;
    this.oConfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("Product has been removed", "Close", { duration: 3000 });
        this.oProductAjaxService.deleteProduct(product.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.oStatus = error;
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("Product has not been removed", "Close", { duration: 3000 });
      }
    });
  }

}
