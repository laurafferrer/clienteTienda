import { Component, Input, OnInit, Optional } from '@angular/core';
import { IUser } from '../../../model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserAjaxService } from '../../../service/user.ajax.service';

@Component({
  selector: 'app-admin-user-detail-unrouted',
  templateUrl: './admin-user-detail-unrouted.component.html',
  styleUrls: ['./admin-user-detail-unrouted.component.css']
})
export class AdminUserDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oUser: IUser = {} as IUser;
  oStatus: HttpErrorResponse | null = null;

  constructor(
    private oUserAjaxService: UserAjaxService,
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
    this.oUserAjaxService.getUserById(this.id).subscribe({
      next: (data: IUser) => {
        this.oUser = data;
      },
      error: (error: HttpErrorResponse) => {
        this.oStatus = error;
      }
    });
  }

}
