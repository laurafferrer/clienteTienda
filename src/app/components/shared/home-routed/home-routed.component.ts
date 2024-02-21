import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../model/model.interfaces';
import { NavigationEnd, Router } from '@angular/router';
import { SessionAjaxService } from '../../../service/session.ajax.service';
import { UserAjaxService } from '../../../service/user.ajax.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home-routed',
  templateUrl: './home-routed.component.html',
  styleUrls: ['./home-routed.component.css']
})
export class HomeRoutedComponent implements OnInit {

  oUsername: string = '';
  oUserSession: IUser | null = null;
  oUrl: string = '';

  constructor(
    private oRouter: Router,
    private oSessionService: SessionAjaxService,
    private oUserAjaxService: UserAjaxService
  ) { 
    this.oRouter.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.oUrl = ev.url;
      }
    })

    this.oUsername = oSessionService.getUsername();
    this.oUserAjaxService.getUserByUsername(this.oSessionService.getUsername()).subscribe({
      next: (user: IUser) => {
        this.oUserSession = user;
        console.log('User Session:', this.oUserSession); // Agrega este log
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  ngOnInit() {
  }

}
