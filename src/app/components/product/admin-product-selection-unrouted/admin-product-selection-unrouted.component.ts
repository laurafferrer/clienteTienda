import { Component, OnInit } from '@angular/core';
import { IProduct, IProductPage } from '../../../model/model.interfaces';
import { PaginatorState } from 'primeng/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductAjaxService } from '../../../service/product.ajax.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-admin-product-selection-unrouted',
  templateUrl: './admin-product-selection-unrouted.component.html',
  styleUrls: ['./admin-product-selection-unrouted.component.css']
})
export class AdminProductSelectionUnroutedComponent implements OnInit {

  oPage: IProductPage | undefined;
  oOrderFiled: string = "id";
  oOrderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  oStatus: HttpErrorResponse | null = null;

  constructor(
    private oProductAjaxService: ProductAjaxService,
    private oDialogService: DialogService,
    private oDynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oProductAjaxService.getPageProducts(this.oPaginatorState.rows, this.oPaginatorState.page, this.oOrderFiled, this.oOrderDirection).subscribe({
      next: (data: IProductPage) => {
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
    this.oOrderFiled = fieldOrder;
    if (this.oOrderDirection == "asc") {
      this.oOrderDirection = "desc";
    } else {
      this.oOrderDirection = "asc";
    }
    this.getPage();
  }

  selectProduct(product: IProduct) {
    this.oDynamicDialogRef.close(product);
  }

}
