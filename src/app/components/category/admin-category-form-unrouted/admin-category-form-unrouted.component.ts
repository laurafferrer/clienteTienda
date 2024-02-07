import { CategoryAjaxService } from './../../../service/category.ajax.service';
import { Component, Input, OnInit } from '@angular/core';
import { ICategory, formOperation } from '../../../model/model.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-category-form-unrouted',
  templateUrl: './admin-category-form-unrouted.component.html',
  styleUrls: ['./admin-category-form-unrouted.component.css']
})
export class AdminCategoryFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  oCategoryForm!: FormGroup;
  oCategory: ICategory = {} as ICategory;
  oStatus: HttpErrorResponse | null = null;

  constructor(
    private oCategoryAjaxService: CategoryAjaxService,
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oMatSanckBar: MatSnackBar
  ) { 
    this.initializeForm(this.oCategory);
  }

  initializeForm(oCategory: ICategory){
    this.oCategoryForm = this.oFormBuilder.group({
      id: [oCategory.id],
      name: [oCategory.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    });
  }

  ngOnInit() {
    if (this.operation === 'EDIT') {
      this.oCategoryAjaxService.getCategoryById(this.id).subscribe({
        next: (data: ICategory) => {
          this.oCategory = data;
          this.initializeForm(this.oCategory);
        },
        error: (error: HttpErrorResponse) => {
          this.oStatus = error;
          this.oMatSanckBar.open("Error: " + error.message, "Close", {duration: 3000});
        }
      });
    } else {
      this.initializeForm(this.oCategory);
    }
  }

  public hasError = (controlName: string, error: string) => {
    return this.oCategoryForm.controls[controlName].hasError(error);
  }

  onSubmit() {
    if (this.operation === 'NEW') {
      this.oCategoryAjaxService.createCategory(this.oCategoryForm.value).subscribe({
        next: (data: ICategory) => {
          this.oCategory = data;
          this.initializeForm(this.oCategory);
          if (this.oCategory.id) {
            this.oRouter.navigate(['/admin', 'category', 'plist', this.oCategory.id]);
          }
          this.oMatSanckBar.open("Category created", "Close", {duration: 3000});
        },
        error: (error: HttpErrorResponse) => {
          this.oStatus = error;
          this.oMatSanckBar.open("Error: " + error.message, "Close", {duration: 3000});
        }
      });
    } else {
      this.oCategoryAjaxService.updateCategory(this.oCategoryForm.value).subscribe({
        next: (data: ICategory) => {
          this.oCategory = data;
          this.initializeForm(this.oCategory);
          if (this.oCategory.id) {
            this.oRouter.navigate(['/admin', 'category', 'view', this.oCategory.id]);
          }
          this.oMatSanckBar.open("Category updated", "Close", {duration: 3000});
        },
        error: (error: HttpErrorResponse) => {
          this.oStatus = error;
          this.oMatSanckBar.open("Error: " + error.message, "Close", {duration: 3000});
        }
      });
    }
  }

}
