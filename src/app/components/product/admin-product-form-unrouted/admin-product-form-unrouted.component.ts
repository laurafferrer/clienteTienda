import { Component, Input, OnInit, Optional } from '@angular/core';
import { ICategory, IProduct, formOperation } from '../../../model/model.interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductAjaxService } from '../../../service/product.ajax.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MediaService } from '../../../service/media.service';
import { AdminCategorySelectionUnroutedComponent } from '../../category/admin-category-selection-unrouted/admin-category-selection-unrouted.component';

@Component({
  selector: 'app-admin-product-form-unrouted',
  templateUrl: './admin-product-form-unrouted.component.html',
  styleUrls: ['./admin-product-form-unrouted.component.css']
})
export class AdminProductFormUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW';

  oProductForm!: FormGroup;
  oProduct: IProduct = { image: '', category: {} } as IProduct;
  oStatus: HttpErrorResponse | null = null;
  oDynamicDialogRef: DynamicDialogRef | undefined;
  oSelectedCategory : ICategory | undefined;
  oSelectedImageUrl: string | undefined = '';

  constructor(
    private oProductAjaxService: ProductAjaxService,
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar,
    private oMediaService: MediaService,
    private oDialogService: DialogService
  ) {
    this.initializeForm(this.oProduct);
  }

  initializeForm(product: IProduct) {
    this.oProductForm = this.oFormBuilder.group({
      id: [this.oProduct.id],
      name: [this.oProduct.name, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      description: [this.oProduct.description, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      price: [this.oProduct.price, [Validators.required]],
      stock: [this.oProduct.stock, [Validators.required]],
      image: [this.oProduct.image],
      category: this.oFormBuilder.group({
        id: [this.oProduct.category.id, [Validators.required]],
      }),
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oProductAjaxService.getProductById(this.id).subscribe({
        next: (data: IProduct) => {
          this.oProduct = data;
          this.initializeForm(this.oProduct);
        },
        error: (error: HttpErrorResponse) => {
          this.oStatus = error;
          this.oMatSnackBar.open("Error getting product data", "Accept", {duration: 3000});
        }
      })
    } else {
      this.initializeForm(this.oProduct);
    }
  }

  public hasError = (controlName: string, error: string) => {
    return this.oProductForm.controls[controlName].hasError(error);
  }

  onSubmit() {
    if (this.oProductForm.valid) {
      if (this.operation == 'NEW') {
        this.oProductAjaxService.createProduct(this.oProductForm.value).subscribe({
          next: (data: IProduct) => {
            this.oProduct = { "image": '', "category": {} } as IProduct;
            this.oProduct.id = data.id;
            this.initializeForm(this.oProduct);
            this.oMatSnackBar.open("Product created", "Accept", {duration: 3000});
            this.oRouter.navigate(['/admin', 'product', 'view', data.id]);          
          },
          error: (error: HttpErrorResponse) => {
            this.oStatus = error;
            this.oMatSnackBar.open("Error creating product", "Accept", {duration: 3000});
          }
        })
      } else {
        this.oProductAjaxService.updateProduct(this.oProductForm.value).subscribe({
          next: (data: IProduct) => {
            this.oProduct = data;
            this.initializeForm(this.oProduct);
            this.oMatSnackBar.open("Product updated", "Accept", {duration: 3000});
            this.oRouter.navigate(['/admin', 'product', 'view', this.oProduct.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.oStatus = error;
            this.oMatSnackBar.open("Error updating product", "Accept", {duration: 3000});
          }
        })
      }
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const oFormData = new FormData();
      oFormData.append('file', file);

      this.oMediaService.uploadFile(oFormData).subscribe({
        next: (response) => {
          this.oSelectedImageUrl = response.url;
          this.oProduct.image = response.url;
          this.oProductForm.controls['image'].patchValue(response.url);
        },
        error: (error) => {
          this.oMatSnackBar.open("Error uploading file", "Accept", {duration: 3000});
        }
       });
    }
  }

 

  onShowCategorySelection() {
    this.oDynamicDialogRef = this.oDialogService.open(AdminCategorySelectionUnroutedComponent, {
      header: 'Select category',
      width: '70%',
      maximizable: true,
    });

    if (this.oDynamicDialogRef) {
      this.oDynamicDialogRef.onClose.subscribe((category: ICategory) => {
        if (category) {
          this.oProduct.category = category;
          this.oProductForm.controls['category'].patchValue({id: category.id});
        }
      });
    }
  }

}
