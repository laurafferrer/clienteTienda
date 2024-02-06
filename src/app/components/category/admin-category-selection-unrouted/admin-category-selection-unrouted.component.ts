import { Component, OnInit } from '@angular/core';
import { ICategory, ICategoryPage } from '../../../model/model.interfaces';
import { PaginatorState } from 'primeng/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryAjaxService } from '../../../service/category.ajax.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-admin-category-selection-unrouted',
  templateUrl: './admin-category-selection-unrouted.component.html',
  styleUrls: ['./admin-category-selection-unrouted.component.css']
})
export class AdminCategorySelectionUnroutedComponent implements OnInit {

  oPage: ICategoryPage | undefined;
  oOrderField: string = "id";
  oOrderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  oStatus: HttpErrorResponse | null = null;

  constructor(
    private oCategoryAjaxService: CategoryAjaxService,
    private oDialogService: DialogService,
    private oDynamicDialogRef: DynamicDialogRef
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oCategoryAjaxService.getPageCategory(this.oPaginatorState.rows, this.oPaginatorState.page, this.oOrderField, this.oOrderDirection).subscribe({
      next: (data: ICategoryPage) => {
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

  selectCategory(categroy: ICategory) {
    this.oDynamicDialogRef.close(categroy);
  }

}
