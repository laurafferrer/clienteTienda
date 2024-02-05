import { Component, Input, OnInit, Optional } from '@angular/core';
import { ICategory } from '../../../model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { CategoryAjaxService } from '../../../service/category.ajax.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-admin-category-detail-unrouted',
  templateUrl: './admin-category-detail-unrouted.component.html',
  styleUrls: ['./admin-category-detail-unrouted.component.css']
})
export class AdminCategoryDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oCategory: ICategory = {} as ICategory;
  oStatus: HttpErrorResponse | null = null;

  constructor(
    private oCategoryAjaxService: CategoryAjaxService,
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
    this.oCategoryAjaxService.getCategoryById(this.id).subscribe({
      next: (data: ICategory) => {
        this.oCategory = data;
      },
      error: (error: HttpErrorResponse) => {
        this.oStatus = error;
      }
    });
  }

}
