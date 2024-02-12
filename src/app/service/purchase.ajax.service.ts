import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../environment/environment';
import { IPurchase, IPurchasePage } from './../model/model.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PurchaseAjaxService {

  private url = API_URL + '/purchase';

constructor(private http: HttpClient) { }

  getPurchaseById(id: number): Observable<IPurchase> {
    return this.http.get<IPurchase>(this.url + '/' + id);
  }

  getPurchaseByUserId(user_id: number, size: number, page: number, direction: string, sort: string): Observable<IPurchasePage> {
    return this.http.get<IPurchasePage>(this.url + '/user/' + user_id + '?szie=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
  }

  getPagePurchases(size: number, page: number, sort: string, direction: string, user_id: number): Observable<IPurchasePage> {
    let user = "";
    if (user_id > 0) {
      user = '&user_id=' + user_id;
    }
    return this.http.get<IPurchasePage>(this.url + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction + user);
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

  getPurchasMostExpensiveByUserId(userId: number, size: number, page: number, sort: string, direction: string): Observable<IPurchasePage> {
    return this.http.get<IPurchasePage>(this.url + '/mostExpensiveByUserId/' + userId + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
  }

  getPurchasCheapestByUserId(userId: number, size: number, page: number, sort: string, direction: string): Observable<IPurchasePage> {
    return this.http.get<IPurchasePage>(this.url + '/cheapestByUserId/' + userId + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction);
  }

  makeSingleCartPurchase(user_id: number, cart_id: number): Observable<IPurchase> {
    return this.http.post<IPurchase>(this.url + '/makeSingleCartPurchase/' + user_id + '/' + cart_id, {});
  }

  makeAllCartPurchase(user_id: number): Observable<IPurchase> {
    return this.http.post<IPurchase>(this.url + '/makeAllCartPurchase/' + user_id, {});
  }

  createPurchaseProduct(productId: number, userId: number, amount: number): Observable<IPurchase> {
    return this.http.post<IPurchase>(this.url + '/createPurchaseProduct/' + productId + '/' + userId + '/' + amount, {});
  }

  createPurchaseOneCart(userId: number, cartId: number): Observable<IPurchase> {
    return this.http.post<IPurchase>(this.url + '/createPurchaseOneCart/' + userId + '/' + cartId, {});
  }

  createPurchaseAllCarts(userId: number): Observable<IPurchase> {
    return this.http.post<IPurchase>(this.url + '/createPurchaseAllCarts/' + userId, {});
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
