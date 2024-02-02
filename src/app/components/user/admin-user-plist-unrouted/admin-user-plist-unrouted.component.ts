import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UserAjaxService } from '../../../service/user.ajax.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser, IUserPage } from '../../../model/model.interfaces';
import { Subject, of } from 'rxjs';
import { PaginatorState } from 'primeng/paginator';
import { ConfirmEventType, ConfirmationService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminUserDetailUnroutedComponent } from '../admin-user-detail-unrouted/admin-user-detail-unrouted.component';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-user-plist-unrouted',
  templateUrl: './admin-user-plist-unrouted.component.html',
  styleUrls: ['./admin-user-plist-unrouted.component.css']
})
export class AdminUserPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolean> = new Subject<boolean>();

  oPage: IUserPage | undefined;
  oOrderField: string = 'id';
  oOrderDirection: string = 'asc';
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oUserToRemove: IUser | null = null; 

  constructor(    
    private oUserAjaxService: UserAjaxService,
    public oDialogService: DialogService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.getPage();
    this.forceReload.subscribe({
      next: (v) => {
        if (v) {
          this.getPage();
        }
      }
    });
  }

 /* search(filterValue: string): void {
    if (filterValue && filterValue.length >= 3) {
      this.oUserAjaxService.getUserPage(this.oPaginatorState.rows, this.oPaginatorState.first, 'id', 'asc', filterValue)
      .pipe(
        debounceTime(500),
        switchMap((data: IUserPage) => {
          return of(data);
        })
      )
      .subscribe(
        (data: IUserPage) => {
          this.oPage = data;
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      this.oUserAjaxService.getUserPage(this.oPaginatorState.rows, this.oPaginatorState.first, 'id', 'asc')
      .subscribe(
        (data: IUserPage ) => {
          this.oPage = data;
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }*/

  getValues(event: any): string {
    return event.target.value;
  }

  getPage(): void {
    this.oUserAjaxService.getUserPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.oOrderField, this.oOrderDirection).subscribe({
      next: (data: IUserPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(fieldOrder: string){
    this.oOrderField = fieldOrder;
    this.oOrderDirection = this.oOrderDirection == "asc" ? "desc" : "asc";
    this.getPage();
  }

  doView(user: IUser) {
    let ref: DynamicDialogRef | undefined;
    ref = this.oDialogService.open(AdminUserDetailUnroutedComponent, {
      header: 'User Detail',
      width: '70%',
      maximizable: false,
      data: { id: user.id, ref}
    });
  }

  doRemove(user: IUser) {
    this.oUserToRemove = user;
    this.oConfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("User has been deleted", "Close", {duration: 3000});
        this.oUserAjaxService.deleteUser(user.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("User has not been deleted", "Accept", {duration: 3000});
      }
    })
  }

}
