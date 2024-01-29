import { Injectable } from '@angular/core';
import { API_URL } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserPage } from '../model/model.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAjaxService {

  url: string = API_URL + '/user';

  constructor(private http: HttpClient) { }

  getUserById(id: number) {
    return this.http.get<IUser>(this.url + '/' + id);
  }

  getUserByUsername(username: string): Observable<IUser> {
    return this.http.get<IUser>(this.url + '/username/' + username);
  }

  getUserRandom(): Observable<IUser> {
    return this.http.get<IUser>(this.url + '/random');
  }

  getUserPage(page: number, size: number, sort: string, direction: string): Observable<IUserPage> {
    return this.http.get<IUserPage>(this.url + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
  }

  getUsersByPurchaseDetailDesc(page: number, size: number): Observable<IUserPage> {
    return this.http.get<IUserPage>(this.url + '/purchaseDetailDesc?page=' + page + '&size=' + size);
  }

  getUsersByPurchaseDetailAsc(page: number, size: number): Observable<IUserPage> {
    return this.http.get<IUserPage>(this.url + '/purchaseDetailAsc?page=' + page + '&size=' + size);
  }

  createUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.url, user);
  }

  generateUsers(amount: number): Observable<number> {
    return this.http.post<number>(this.url + '/populate/' + amount, {});
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.url, user);
  }

  deleteUser(id: number | undefined): Observable<number> {
    return this.http.delete<number>(this.url + '/' + id);
  }

  deleteAllUsers(): Observable<number> {
    return this.http.delete<number>(this.url + '/empty');
  }

}
