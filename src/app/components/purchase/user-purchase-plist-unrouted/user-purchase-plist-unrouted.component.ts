import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IPurchasePage, IUser } from '../../../model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { PurchaseAjaxService } from '../../../service/purchase.ajax.service';
import { SessionAjaxService } from '../../../service/session.ajax.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-user-purchase-plist-unrouted',
  templateUrl: './user-purchase-plist-unrouted.component.html',
  styleUrls: ['./user-purchase-plist-unrouted.component.css']
})
export class UserPurchasePlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
 

  oPage: IPurchasePage | undefined;
  oUser: IUser | null = null;
  oOrderField: string = 'id';
  oOrderDirection: string = 'asc';
  paginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  status: HttpErrorResponse | null = null;

  constructor(
    private oPurchaseAjaxService: PurchaseAjaxService,
    private oSessionAjaxSevice: SessionAjaxService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getCompras();
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getCompras();
        }
      }
    })
  }

  getCompras(): void {
    this.oSessionAjaxSevice.getSessionUser()?.subscribe({
      next: (user: IUser) => {
        this.oUser = user;
        this.oPurchaseAjaxService.getPagePurchases(this.paginatorState.rows ?? 0, this.paginatorState.page ?? 0, this.oOrderField, this.oOrderDirection, this.oUser?.id).subscribe({
          next: (page: IPurchasePage) => {
            this.oPage = page;
            this.paginatorState.pageCount = this.oPage.totalPages;
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('Error al obtener las compras', 'OK', { duration: 3000 });
          }
        });
      }
    })
    }
  
  onPageChange(event: PaginatorState) {
    this.paginatorState.rows = event.rows;
    this.paginatorState.page = event.page;
    this.getCompras();
  }

}
