import { Component, Input, OnInit, Optional } from '@angular/core';
import { IPurchase } from '../../../model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { PurchaseAjaxService } from '../../../service/purchase.ajax.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-admin-purchase-detail-unrouted',
  templateUrl: './admin-purchase-detail-unrouted.component.html',
  styleUrls: ['./admin-purchase-detail-unrouted.component.css']
})
export class AdminPurchaseDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oPurchase: IPurchase = {} as IPurchase;
  oStatus: HttpErrorResponse | null = null;

  constructor(
    private oPurchaseAjaxService: PurchaseAjaxService,
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

  getOne(): void {
    this.oPurchaseAjaxService.getPurchaseById(this.id).subscribe({
      next: (data: IPurchase) => {
        this.oPurchase = data;
      },
      error: (error: HttpErrorResponse) => {
        this.oStatus = error;
      }
    });
  }

}
