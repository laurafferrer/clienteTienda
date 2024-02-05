import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { CategoryAjaxService } from '../../../service/category.ajax.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-category-plist-routed',
  templateUrl: './admin-category-plist-routed.component.html',
  styleUrls: ['./admin-category-plist-routed.component.css']
})
export class AdminCategoryPlistRoutedComponent implements OnInit {

  oForeceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;

  constructor(
    private oCategoryAjaxService: CategoryAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oCategoryAjaxService.generateCategories(amount).subscribe({
      next: (response: number) => {
        this.oMatSnackBar.open(`Se han generado ${response} categorias`, 'Aceptar', { duration: 3000 });
        this.bLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.oMatSnackBar.open(`Se ha producido un error al generar categorias aleatorios: ${err.message}`, 'Aceptar', { duration: 3000 });
        this.bLoading = false;
      }
    })
  }

  doEmpty($event: Event) {
    this.oConfirmationService.confirm({
      target: $event.target as EventTarget,
      message: 'Are you sure that you want to delete all categories?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bLoading = true;
        this.oCategoryAjaxService.deleteAllCategories().subscribe({
          next: (response: number) => {
            this.oMatSnackBar.open('Is deleted ' + response + ' categories', 'Close', {duration: 3000});
            this.bLoading = false;
            this.oForeceReload.next(true);
          },
          error: (error: HttpErrorResponse) => {
            this.oMatSnackBar.open('Error: ' + error.message, 'Close', {duration: 3000});
            this.bLoading = false;
          }
        });
      },
    });
  }

}
