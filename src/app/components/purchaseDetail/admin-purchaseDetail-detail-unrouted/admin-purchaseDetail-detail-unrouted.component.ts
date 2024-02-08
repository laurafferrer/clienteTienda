import { Component, Input, OnInit, Optional } from '@angular/core';
import { IPurchaseDetail } from '../../../model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { PurchaseDetailAjaxService } from '../../../service/purchaseDetail.ajax.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-admin-purchaseDetail-detail-unrouted',
  templateUrl: './admin-purchaseDetail-detail-unrouted.component.html',
  styleUrls: ['./admin-purchaseDetail-detail-unrouted.component.css']
})
export class AdminPurchaseDetailDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oPurchaseDetail: IPurchaseDetail = {} as IPurchaseDetail;
  oStatus: HttpErrorResponse | null = null;

  constructor(
    private oPurchaseDetailAjaxService: PurchaseDetailAjaxService,
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
    this.oPurchaseDetailAjaxService.getPurchaseDetailById(this.id).subscribe({
      next: (data: IPurchaseDetail) => {
        this.oPurchaseDetail = data;
      },
      error: (error: HttpErrorResponse) => {
        this.oStatus = error;
      }
    });
  }

}