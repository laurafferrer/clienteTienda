import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { Subject } from 'rxjs';
import { ICategory, ICategoryPage } from '../../../model/model.interfaces';
import { CategoryAjaxService } from '../../../service/category.ajax.service';
import { AdminCategoryDetailUnroutedComponent } from '../admin-category-detail-unrouted/admin-category-detail-unrouted.component';

@Component({
  providers: [DialogService, ConfirmationService],
  selector: 'app-admin-category-plist-unrouted',
  templateUrl: './admin-category-plist-unrouted.component.html',
  styleUrls: ['./admin-category-plist-unrouted.component.css']
})
export class AdminCategoryPlistUnroutedComponent implements OnInit {

  @Input() oForceReload: Subject<boolean> = new Subject<boolean>();

  oPage: ICategoryPage | undefined;
  oOrderField: string = "id";
  oOrderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0};
  oStatus: HttpErrorResponse | null = null;
  oCategoryToDelete: ICategory | null = null;

  constructor(
    private oCategoryAjaxService: CategoryAjaxService,
    public oDialogService: DialogService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
    this.oForceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    })
  }

  getPage(): void {
    this.oCategoryAjaxService.getPageCategories(this.oPaginatorState.rows, this.oPaginatorState.page, this.oOrderField, this.oOrderDirection).subscribe({
      next: (oPage: ICategoryPage) => {
        this.oPage = oPage;
        this.oPaginatorState.pageCount = oPage.totalPages;
        console.log(this.oPage)
      },
      error: (response: HttpErrorResponse) => {
        this.oStatus = response;
      }
    });
    }

    onPageChange(event: PaginatorState) {
      this.oPaginatorState.rows = event.rows;
      this.oPaginatorState.page = event.page;
      this.getPage();
    }

    doOrder(fieldorder: string) {
      this.oOrderField = fieldorder;
      this.oOrderDirection = this.oOrderDirection == "asc" ? "desc" : "asc";
      this.getPage();
    }

    doView(category: ICategory) {
      let ref: DynamicDialogRef | undefined;
      ref = this.oDialogService.open(AdminCategoryDetailUnroutedComponent , {
        width: '70%',
        maximizable: false,
        data: { id: category.id, ref }
        });
      }

      doRemove(category: ICategory) {
        this.oCategoryToDelete = category;
        this.oConfirmationService.confirm({
          accept: () => {
            this.oMatSnackBar.open("Category as been deleted", 'Aceptar', { duration: 3000 });
            this.oCategoryAjaxService.deleteCategory(category.id).subscribe({
              next: () => {
                this.getPage();
              },
              error: (err: HttpErrorResponse) => {
                this.oStatus = err;
              }
            });
          },
          reject: (type: ConfirmEventType) => {
            this.oMatSnackBar.open("No se ha podido eliminar la categoria", 'Aceptar', { duration: 3000 });
          }
        })
      }

}
