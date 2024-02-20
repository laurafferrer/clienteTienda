import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_URL } from "../../environment/environment"
import { UserAjaxService } from "./user.ajax.service";
import { IPrelogin, IToken, IUser, SessionEvent } from "../model/model.interfaces";
import { Observable, Subject } from "rxjs";

@Injectable()

export class SessionAjaxService {

  private url = API_URL + '/session';

  subjectSession = new Subject<SessionEvent>();

  constructor(private oHttpClient: HttpClient, private oUserAjaxService: UserAjaxService) {

  }

  private parseJwt(token: string): IToken {
    var base64url = token.split('.')[1];
    var base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  login(sUsername: string, sPassword: string): Observable<any> {
    return this.oHttpClient.post(this.url + '/login', { username: sUsername, password: sPassword }, { responseType: 'text'});
  }

  prelogin(): Observable<IPrelogin> {
    return this.oHttpClient.get<IPrelogin>(this.url + '/prelogin');
  }

  loginCaptcha(sUsername: string, sPassword: string, sToken: string, sAnswer: string): Observable<any> {
    return this.oHttpClient.post(this.url + '/loginCaptcha', { username: sUsername, password: sPassword, token: sToken, answer: sAnswer }, { responseType: 'text'});
  }

  setToken(sToken: string): void {
    localStorage.setItem('token', sToken);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isSessionActive(): boolean {
    let strToken: string | null = localStorage.getItem('token');
    if (strToken) {
      let oDecodedToken: IToken = this.parseJwt(strToken);
      if (Date.now() >= oDecodedToken.exp * 1000) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  getUsername(): string {
    if (this.isSessionActive()) {
      let token: string | null = localStorage.getItem('token');
      if (!token) {
        return '';
      } else {
        return this.parseJwt(token).name;
      }
    } else {
      return '';
    }
  }

  on(): Observable<SessionEvent> {
    return this.subjectSession.asObservable();
  }

  emit(event: SessionEvent): void {
    this.subjectSession.next(event);
  }

  getSessionUser(): Observable<IUser> | null {
    if (this.isSessionActive()) {
      return this.oUserAjaxService.getUserByUsername(this.getUsername());
    } else {
      return null;
    }
  }

}