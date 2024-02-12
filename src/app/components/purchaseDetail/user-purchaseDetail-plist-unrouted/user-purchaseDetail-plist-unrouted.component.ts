import { Component, Input, OnInit, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { IPurchase, IPurchaseDetail, IPurchaseDetailPage } from '../../../model/model.interfaces';
import { PaginatorState } from 'primeng/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { PurchaseAjaxService } from '../../../service/purchase.ajax.service';
import { PurchaseDetailAjaxService } from '../../../service/purchaseDetail.ajax.service';

@Component({
  selector: 'app-user-purchaseDetail-plist-unrouted',
  templateUrl: './user-purchaseDetail-plist-unrouted.component.html',
  styleUrls: ['./user-purchaseDetail-plist-unrouted.component.css']
})
export class UserPurchaseDetailPlistUnroutedComponent implements OnInit {

  @Input() oForceReload: Subject<boolean> = new Subject<boolean>();
  @Input() oPurchaseId: number = 0;
  @Input() oProductId: number = 0;

  oPage: IPurchaseDetailPage | undefined;
  oPurchase: IPurchase | null = null;
  oOrderField: string = 'id';
  oOrderDirection: string = 'asc';
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount : 0};
  oStatus: HttpErrorResponse | null = null;

  constructor(
    private oPurchaseDetailAjaxService: PurchaseDetailAjaxService,
    private oPurchaseAjaxService: PurchaseAjaxService
  ) { }

  ngOnInit() {
    this.getPage();
    if (this.oPurchaseId > 0) {
      this.getPurchase();
    } 
    this.oForceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    })
  }

  getPage(): void {
    this.oPurchaseDetailAjaxService.getPurchaseDetailByPurchaseId(this.oPurchaseId, this.oPaginatorState.rows ?? 0, this.oPaginatorState.page ?? 0, this.oOrderField, this.oOrderDirection).subscribe({
      next: (data: IPurchaseDetailPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (err: HttpErrorResponse) => {
        this.oStatus = err;
      }
    })
  }

  onPageChange(event: PaginatorState): void {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  getPurchase(): void {
    this.oPurchaseAjaxService.getPurchaseById(this.oPurchaseId).subscribe({
      next: (data: IPurchase) => {
        this.oPurchase = data;
      },
      error: (err: HttpErrorResponse) => {
        this.oStatus = err;
      }
    })
  }

}
