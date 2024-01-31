import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(
    private oFormBuilder: FormBuilder,
    private oRouter: Router,
    private oSessionService: SessionAjaxService,
    private oMatSnackBar: MatSnackBar,
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
        this.oMatSnackBar.open("Error getting prelogin operation.", '', { duration: 2000 });
      }
    });
  }

  ngOnInit() {
    this.getPreloginData();
  }

  onSubmit() {
    if (this.oLoginForm.valid && this.oPrelogin) {
      let username = this.oLoginForm.value.username;
      let passwordSHA256 = this.oCryptoService.getSHA256(this.oLoginForm.value.password);
      let token = this.oPrelogin.token;
      let answer = this.oLoginForm.value.captcha;

      this.oSessionService.loginCaptcha(username, passwordSHA256, token, answer).subscribe({
        next: (data: string) => {
          this.oSessionService.setToken(data);
          this.oSessionService.emit({ type: 'login' });
          this.oMatSnackBar.open("login.successfull.", '', { duration: 2000 });
          this.oRouter.navigate(['/home']);
        }, error: (error: HttpErrorResponse) => {
          this.oStatus = error;
          this.oMatSnackBar.open("global.error", '', { duration: 2000 });
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

  onRegister() {
    this.oRouter.navigate(['/user/user/new']);
  }

  loginAdmin() {
    this.oLoginForm.setValue({ username: 'lauraferrer', password: '132456', captcha: ''});
  }

  loginUser() {
    this.oLoginForm.setValue({ username: 'marmarzo', password: '123456', captcha: ''});
  }

}
