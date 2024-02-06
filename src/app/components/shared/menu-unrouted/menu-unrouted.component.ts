import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { IUser, SessionEvent } from '../../../model/model.interfaces';
import { SessionAjaxService } from '../../../service/session.ajax.service';
import { UserAjaxService } from '../../../service/user.ajax.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css']
})
export class MenuUnroutedComponent implements OnInit {

  strUsername: string = '';
  oUserSession: IUser | null = null;
  strUrl: string = '';

  oShowLogoutMenu: boolean = false;

  constructor(
    private oSessionAjaxService: SessionAjaxService,
    private oUserAjaxService: UserAjaxService,
    private oRouter: Router,
    private oRoute: ActivatedRoute
  ) {
    this.oRouter.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.strUrl = ev.url;
      }
    })

    this.strUsername = oSessionAjaxService.getUsername();
    this.oUserAjaxService.getUserByUsername(this.oSessionAjaxService.getUsername()).subscribe({
      next: (user: IUser) => {
        this.oUserSession = user;
        console.log('User Session:', this.oUserSession);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  ngOnInit() {
    this.oSessionAjaxService.on().subscribe({
      next: (data: SessionEvent) => {
        if (data.type === 'login') {
          this.strUsername = this.oSessionAjaxService.getUsername();
          this.oUserAjaxService.getUserByUsername(this.oSessionAjaxService.getUsername()).subscribe({
            next: (user: IUser) => {
              this.oUserSession = user;
              console.log('User Session:', this.oUserSession);
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
            }
          });
        } else if (data.type === 'logout') {
          this.strUsername = '';
          this.oUserSession = null;
          console.log('User Session after logout:', this.oUserSession);
        }
      }
    });
  }

  toggleLogoutMenu() {
    this.oShowLogoutMenu = !this.oShowLogoutMenu;
  }

  closeLogoutMenu() {
    this.oShowLogoutMenu = false;
  }

  isActive(oRoute: string) {
    return this.oRouter.isActive(oRoute, true);
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.group')) {
      this.oShowLogoutMenu = false;
    }
  }

}
