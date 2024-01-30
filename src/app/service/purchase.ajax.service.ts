import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../environment/environment';
import { IPurchase, IPurchasePage } from './../model/model.interfaces';
import { get } from 'http';

@Injectable({
  providedIn: 'root'
})
export class PurchaseAjaxService {

  private url = API_URL + '/purchase';

constructor(private http: HttpClient) { }

  getPurchaseById(id: number): Observable<IPurchase> {
    return this.http.get<IPurchase>(this.url + '/' + id);
  }

  getPurchaseByUserId(user_id: number, page: number, size: number, direction: string, sort: string): Observable<IPurchasePage> {
    return this.http.get<IPurchasePage>(this.url + '/user/' + user_id + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
  }

  getPagePurchases(page: number, size: number, sort: string, direction: string): Observable<IPurchasePage> {
    return this.http.get<IPurchasePage>(this.url + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
  }

  getPurchaseRnadom(): Observable<IPurchase> {
    return this.http.get<IPurchase>(this.url + '/random');
  }

  findPurchaseByDateOrderDesc(page: number, size: number, sort: string, direction: string): Observable<IPurchasePage> {
    return this.http.get<IPurchasePage>(this.url + '/findPurchaseByDateOrderDesc?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
  }

  findPurchaseByDateOrderAsc(page: number, size: number, sort: string, direction: string): Observable<IPurchasePage> {
    return this.http.get<IPurchasePage>(this.url + '/findPurchaseByDateOrderAsc?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
  }

  findPurchaseByDateOrderContaining(date: string, page: number, size: number, sort: string, direction: string): Observable<IPurchasePage> {
    return this.http.get<IPurchasePage>(this.url + '/findPurchaseByDateOrderContaining/' + date + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
  }

  makeSingleCartPurchase(user_id: number, cart_id: number): Observable<IPurchase> {
    return this.http.post<IPurchase>(this.url + '/makeSingleCartPurchase/' + user_id + '/' + cart_id, {});
  }

  makeAllCartPurchase(user_id: number): Observable<IPurchase> {
    return this.http.post<IPurchase>(this.url + '/makeAllCartPurchase/' + user_id, {});
  }

  generatePurchases(amount: number): Observable<number> {
    return this.http.post<number>(this.url + '/populate/' + amount, {});
  }

  deletePurchase(id: number | undefined): Observable<number> {
    return this.http.delete<number>(this.url + '/' + id);
  }

  deleteAllPurchases(): Observable<number> {
    return this.http.delete<number>(this.url);
  }

}
