import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionAjaxService } from '../../../service/session.ajax.service';

@Component({
  selector: 'app-logout-routed',
  templateUrl: './logout-routed.component.html',
  styleUrls: ['./logout-routed.component.css']
})
export class LogoutRoutedComponent implements OnInit {

  constructor(
    private oSessionAjaxService: SessionAjaxService,
    private oRouter: Router
  ) { }

  ngOnInit() {
  }

  logout() {
    this.oSessionAjaxService.logout();
    this.oSessionAjaxService.emit({ type: 'logout' });
    this.oRouter.navigate(['/home']);
  }

  cancel() {
    this.oRouter.navigate(['/home']);
  }

}
