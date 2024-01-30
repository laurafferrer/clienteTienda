import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPrelogin } from '../../../model/model.interfaces';
import { Router } from '@angular/router';
import { CryptoService } from '../../../service/crypto.service';
import { SessionAjaxService } from '../../../service/session.ajax.service';

@Component({
  selector: 'app-login-routed',
  templateUrl: './login-routed.component.html',
  styleUrls: ['./login-routed.component.css']
})
export class LoginRoutedComponent implements OnInit {

  oLoginForm: FormGroup;
  oStatus: HttpErrorResponse | null = null;
  oPrelogin: IPrelogin | null = null;
  oNotificationMessage: string | null = null;
  oShowNotification = false;

  constructor(
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oSessionService: SessionAjaxService,
    private oCryptoService: CryptoService
  ) { 
    this.oLoginForm = this.oFormBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      captcha: ['', [Validators.required]]
    })
  }

  getPreloginData() {
    this.oSessionService.prelogin().subscribe({
      next: (data: IPrelogin) => {
        this.oPrelogin = data;
      },
      error: (error) => {
        this.oStatus = error;
        this.oShowNotificationWithMessage('Error getting prelogin data');
      }
    });
  }

  ngOnInit() {
    this.getPreloginData();
  }

  onSubmit() {
    if (this.oLoginForm.valid && this.oPrelogin) {
      let username = this.oLoginForm.get('username')?.value;
      let password = this.oLoginForm.get('password')?.value;
      let passwordSHA256 = this.oCryptoService.getSHA256(password);
      let token = this.oPrelogin.token;
      let answer = this.oLoginForm.get('captcha')?.value;
      this.oSessionService.loginCaptcha(username, passwordSHA256, token, answer).subscribe({
        next: (data: string) => {
          this.oSessionService.setToken(data);
          this.oSessionService.emit({ type: 'login' });
          this.oRouter.navigate(['/home']);
        }, error: (error: HttpErrorResponse) => {
          this.oStatus = error;
          this.oShowNotificationWithMessage('Error logging in');
          this.getPreloginData();
          this.oLoginForm.reset();
        }
      });
    }
  }

  onReset() {
    this.oLoginForm.reset();
    this.getPreloginData();
  }

  loginAdmin() {
    this.oLoginForm.setValue({ username: 'lauraferrer', password: '132456', captcha: ''});
  }

  loginUser() {
    this.oLoginForm.setValue({ username: 'marmarzo', password: '123456', captcha: ''});
  }

  oShowNotificationWithMessage(message: string) {
    this.oNotificationMessage = message;
    this.oShowNotification = true;
    setTimeout(() => {
      this.oNotificationMessage = null;
      this.oShowNotification = false;
    }, 2000); // 2 seconds
  }

}
