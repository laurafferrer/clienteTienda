import { Component, Input, OnInit, Optional } from '@angular/core';
import { IProduct } from '../../../model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductAjaxService } from '../../../service/product.ajax.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-product-detail-unrouted',
  templateUrl: './admin-product-detail-unrouted.component.html',
  styleUrls: ['./admin-product-detail-unrouted.component.css']
})
export class AdminProductDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oProduct: IProduct = {} as IProduct;
  oStatus: HttpErrorResponse | null = null;

  constructor(
    private oProductAjaxService: ProductAjaxService,
    private oRouter: Router,
    @Optional() public ref: DynamicDialogRef,
    @Optional() public config: DynamicDialogConfig
  ) {
    if (config) {
      if (config.data) {
        this.id = config.data.id;
      }
    }
   }

  ngOnInit() {
    this.getOne();
  }

  getOne() {
    this.oProductAjaxService.getProductById(this.id).subscribe({
      next: (data: IProduct) => {
        this.oProduct = data;
      },
      error: (error: HttpErrorResponse) => {
        this.oStatus = error;
      }
    });
  }

}
