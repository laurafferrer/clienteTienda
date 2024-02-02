import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ProductAjaxService } from '../../../service/product.ajax.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { subscribe } from 'diagnostics_channel';

@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-product-plist-routed',
  templateUrl: './admin-product-plist-routed.component.html',
  styleUrls: ['./admin-product-plist-routed.component.css']
})
export class AdminProductPlistRoutedComponent implements OnInit {

  oForceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;

  constructor(
    private oProductAjaxService: ProductAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar,
  ) { }

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
