import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ICategoryPage } from '../../../model/model.interfaces';
import { PaginatorState } from 'primeng/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryAjaxService } from '../../../service/category.ajax.service';

@Component({
  selector: 'app-user-category-plist-unrouted',
  templateUrl: './user-category-plist-unrouted.component.html',
  styleUrls: ['./user-category-plist-unrouted.component.css']
})
export class UserCategoryPlistUnroutedComponent implements OnInit {

  @Input() oForceReload: Subject<boolean> = new Subject<boolean>();
  
  oPage: ICategoryPage | undefined;
  oOrderField: string = "id";
  oOrderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  oStatus: HttpErrorResponse | null = null;

  constructor(
    private oCategoryAjaxService: CategoryAjaxService
    ) { }

  ngOnInit() {
    this.getCategories();
    this.oForceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getCategories();
        }
      }
    })
  }

  getCategories(): void {
    this.oCategoryAjaxService.getPageCategory(this.oPaginatorState.rows ?? 0, this.oPaginatorState.page ?? 0, this.oOrderField, this.oOrderDirection).subscribe({
      next: (data: ICategoryPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.oStatus = error;
      }
    })
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getCategories();
  }

}
