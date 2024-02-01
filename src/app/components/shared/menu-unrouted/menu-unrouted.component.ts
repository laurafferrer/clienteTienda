import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { IUser, SessionEvent } from '../../../model/model.interfaces';
import { SessionAjaxService } from '../../../service/session.ajax.service';
import { UserAjaxService } from '../../../service/user.ajax.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css']
})
export class MenuUnroutedComponent implements OnInit {

  strUsername: string = '';
  oUserSesion: IUser | null = null;
  strUrl: string = '';

  oShowLogoutMenu: boolean = false;
  oShowMenu: boolean = false;

  constructor(
    private sessionAjaxService: SessionAjaxService,
    private userAjaxService: UserAjaxService,
    private router: Router
  ) {
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.strUrl = ev.url;
      }
    })

    this.strUsername = sessionAjaxService.getUsername();
    this.userAjaxService.getUserByUsername(this.sessionAjaxService.getUsername()).subscribe({
      next: (user: IUser) => {
        this.oUserSesion = user;
        console.log(this.oUserSesion.role);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }


  ngOnInit() {
    this.sessionAjaxService.on().subscribe({
      next: (data: SessionEvent) => {
        if (data.type === 'login') {
          this.strUsername = this.sessionAjaxService.getUsername();
          this.userAjaxService.getUserByUsername(this.sessionAjaxService.getUsername()).subscribe({
            next: (user: IUser) => {
              this.oUserSesion = user;
              console.log(this.oUserSesion.role);
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
            }
          });
        } else if (data.type === 'logout') {
          this.strUsername = '';
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

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.group')) {
      this.oShowLogoutMenu = false;
    }
  }

}
