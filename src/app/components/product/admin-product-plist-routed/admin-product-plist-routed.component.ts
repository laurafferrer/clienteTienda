import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ProductAjaxService } from '../../../service/product.ajax.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ConfirmPopup } from 'primeng/confirmpopup';

@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-product-plist-routed',
  templateUrl: './admin-product-plist-routed.component.html',
  styleUrls: ['./admin-product-plist-routed.component.css']
})
export class AdminProductPlistRoutedComponent implements OnInit {

  oForceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;
  category_id: number;

  constructor(
    private oActivatedaRoute: ActivatedRoute,
    private oProductAjaxService: ProductAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar,
      ) { 
    this.category_id = parseInt(this.oActivatedaRoute.snapshot.paramMap.get('category_id') ?? "0");
  }

  ngOnInit() {
  }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oProductAjaxService.generateProducts(amount).subscribe({
      next: (reponse: number) => {
        this.oMatSnackBar.open('Has been generated ${reponse} products', "Accept", { duration: 3000 });
        this.bLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.oMatSnackBar.open('Error generating products: ${error.message}', "Accept", { duration: 3000 });
        this.bLoading = false;
      }
    });
  }

  doEmpty($event: Event ) {
    this.oConfirmationService.confirm({
      target: $event.target as EventTarget,
      message: 'Are you sure you want to delete all products?',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-check mr-1',
      rejectIcon: 'pi pi-times mr-1',
      rejectButtonStyleClass: 'p-button-text p-button-danger',
      acceptButtonStyleClass: 'p-button-text p-button-success',
      accept: () => {
        this.oProductAjaxService.deleteAllProducts().subscribe({
          next: (response: number) => {
            this.oMatSnackBar.open('All products have been deleted', 'Accept', { duration: 3000 });
            this.oForceReload.next(true);
            this.bLoading = false;
          },
          error: (error: HttpErrorResponse) => {
            this.oMatSnackBar.open('Error deleting products: ${error.message}', 'Accept', { duration: 3000 });
            this.bLoading = false;
          }
        });
      }
    });
  }

}
