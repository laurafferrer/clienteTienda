import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../../../model/model.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAjaxService } from '../../../service/user.ajax.service';

@Component({
  selector: 'app-user-user-detail-unrouted',
  templateUrl: './user-user-detail-unrouted.component.html',
  styleUrls: ['./user-user-detail-unrouted.component.css']
})
export class UserUserDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oUser: IUser = {} as IUser;
  oStatus: HttpErrorResponse | null = null;
  

  constructor(
    private oUserAjaxService: UserAjaxService
  ) { }

  ngOnInit() {
    this.getUsuario();
  }

  getUsuario(): void {
    this.oUserAjaxService.getUserById(this.id).subscribe({
      next: (user: IUser) => {
        this.oUser = user;
      },
      error: (error: HttpErrorResponse) => {
        this.oStatus = error;
      }
    })
  }

}
