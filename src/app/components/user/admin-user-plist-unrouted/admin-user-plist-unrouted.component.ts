/*import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserAjaxService } from '../../../service/user.ajax.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-user-plist-unrouted',
  templateUrl: './admin-user-plist-unrouted.component.html',
  styleUrls: ['./admin-user-plist-unrouted.component.css']
})
export class AdminUserPlistUnroutedComponent implements OnInit {

  @Input() forceReload: Subject<boolena> = new Subject<boolean>();

  oPage: IUserPage | undefined;
  OrderField: string = 'id';
  orderDirection: string = 'asc';
  oPaginatorState: PaginatorState = { first: 0, rows: 10, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oUserToRemove: IUser | null = null; 

  constructor(    
    private oUserAjaxService: UserAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar,
    private oUserPrintAjaxService: UserPrintAjaxService
  ) {}

  ngOnInit() {
  }

}*/
