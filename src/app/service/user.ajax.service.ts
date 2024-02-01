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

  constructor(private oHttpClient: HttpClient) { }

  getUserById(id: number) {
    return this.oHttpClient.get<IUser>(this.url + '/' + id);
  }

  getUserByUsername(username: string): Observable<IUser> {
    return this.oHttpClient.get<IUser>(this.url + '/username/' + username);
  }

  getUserRandom(): Observable<IUser> {
    return this.oHttpClient.get<IUser>(this.url + '/random');
  }

  getUserPage(page: number | undefined, size: number | undefined, orderField: string, orderDirection: string, strFilter?: string): Observable<IUserPage> {
    let sUrl_filter: string;
    if (!size) size = 10;
    if (!page) page = 0;
    if (strFilter && strFilter.trim().length > 0) {
      sUrl_filter = `&filter=${strFilter}`;
    } else {
      sUrl_filter = '';
    }
    return this.oHttpClient.get<IUserPage>(this.url + "?size=" + size + "&page=" + page + "&sort" + orderField + "," + orderDirection + sUrl_filter);

  }

  getUsersByPurchaseDetailDesc(page: number, size: number): Observable<IUserPage> {
    return this.oHttpClient.get<IUserPage>(this.url + '/purchaseDetailDesc?page=' + page + '&size=' + size);
  }

  getUsersByPurchaseDetailAsc(page: number, size: number): Observable<IUserPage> {
    return this.oHttpClient.get<IUserPage>(this.url + '/purchaseDetailAsc?page=' + page + '&size=' + size);
  }

  createUser(user: IUser): Observable<IUser> {
    return this.oHttpClient.post<IUser>(this.url, user);
  }

  generateUsers(amount: number): Observable<number> {
    return this.oHttpClient.post<number>(this.url + '/populate/' + amount, {});
  }

  updateUser(user: IUser): Observable<IUser> {
    return this.oHttpClient.put<IUser>(this.url, user);
  }

  deleteUser(id: number | undefined): Observable<number> {
    return this.oHttpClient.delete<number>(this.url + '/' + id);
  }

  deleteAllUsers(): Observable<number> {
    return this.oHttpClient.delete<number>(this.url + '/empty');
  }

}
