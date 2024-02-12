import { Component, Input, OnInit, Optional } from '@angular/core';
import { IPurchase } from '../../../model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { PurchaseAjaxService } from '../../../service/purchase.ajax.service';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-user-purchase-detail-unrouted',
  templateUrl: './user-purchase-detail-unrouted.component.html',
  styleUrls: ['./user-purchase-detail-unrouted.component.css']
})
export class UserPurchaseDetailUnroutedComponent implements OnInit {

  @Input() id: number = 0;
  oPurchase: IPurchase = {} as IPurchase;
  oStatus: HttpErrorResponse | null = null;

  constructor(
    private oPurchaseAjaxService: PurchaseAjaxService,
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
    this.getPurchase();
    this.getDetailsArray();
  }

  getPurchase() {
    this.oPurchaseAjaxService.getPurchaseById(this.id).subscribe({
      next: (data: IPurchase) => {
        this.oPurchase = data;
      },
      error: (err: HttpErrorResponse) => {
        this.oStatus = err;
      }
    })
  }

  getDetailsArray(): number[] {
    return Array.from({ length: this.oPurchase.purchase_details }, (_, index) => index);
  }

}
