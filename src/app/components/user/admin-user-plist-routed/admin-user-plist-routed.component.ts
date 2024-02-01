import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { UserAjaxService } from '../../../service/user.ajax.service';

@Component({
  providers: [ConfirmationService],
  selector: 'app-admin-user-plist-routed',
  templateUrl: './admin-user-plist-routed.component.html',
  styleUrls: ['./admin-user-plist-routed.component.css']
})
export class AdminUserPlistRoutedComponent implements OnInit {

  oForceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;

  constructor(
    private oUserAjaxService: UserAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oUserAjaxService.generateUsers(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open(`Have been generated ${oResponse} users`, 'OK', { duration: 3000 });
        this.bLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.oMatSnackBar.open('An error ocurred while generating users: ${error.message}', 'OK', { duration: 3000 });
        this.bLoading = false;
      }
    });
  }

  doEmpty($event: Event) {
    this.oConfirmationService.confirm({
      target: $event.target as EventTarget,
      message: 'Are you sure that you want to empty all users?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.oUserAjaxService.deleteAllUsers().subscribe({
          next: (oResponse: number) => {
            this.oMatSnackBar.open(`Have been deleted all users.`, 'OK', { duration: 3000 });
            this.oForceReload.next(true);
            this.bLoading = false;
          },
          error: (error: HttpErrorResponse) => {
            this.oMatSnackBar.open('An error ocurred while deleting users: ${error.message}', 'OK', { duration: 3000 });
            this.bLoading = false;
          }
        });
      }
    });
  }

}
