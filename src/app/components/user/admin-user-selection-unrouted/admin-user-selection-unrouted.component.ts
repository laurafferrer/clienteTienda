import { Component, OnInit } from '@angular/core';
import { IUser, IUserPage } from '../../../model/model.interfaces';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserAjaxService } from '../../../service/user.ajax.service';

@Component({
  selector: 'app-admin-user-selection-unrouted.component',
  templateUrl: './admin-user-selection-unrouted.component.html',
  styleUrls: ['./admin-user-selection-unrouted.component.css']
})
export class AdminUserSelectionUnroutedComponent implements OnInit {

  oPage: IUserPage | undefined;
  oOrderField: string = "id";
  oOrderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  oStatus: HttpErrorResponse | null = null;
  oUsuarioDoRemove: IUser | null = null;

  constructor(
    private oUserAjaxService: UserAjaxService,
    public oDialogService: DialogService,
    public oDynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oUserAjaxService.getUserPage(this.oPaginatorState.page || 0, this.oPaginatorState.rows || 0,  this.oOrderField, this.oOrderDirection).subscribe({
      next: (data: IUserPage) => {
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

  doOrder(orderField: string) {
    this.oOrderField = orderField;
    if (this.oOrderDirection == "asc") {
      this.oOrderDirection = "desc";
    } else {
      this.oOrderDirection = "asc";
    }
    this.getPage();
  }

  onSelectUser(oUser: IUser) {
    this.oDynamicDialogRef.close(oUser);
  }

}
