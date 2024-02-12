import { Injectable } from '@angular/core';
import { API_URL } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPurchaseDetail, IPurchaseDetailPage } from '../model/model.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PurchaseDetailAjaxService {

  private url = API_URL + '/purchaseDetail';

constructor(private http: HttpClient) { }

  getPurchaseDetailById(id: number): Observable<IPurchaseDetail> {
    return this.http.get<IPurchaseDetail>(this.url + '/' + id);
  }

  getPurchaseDetailByPurchaseId(id: number): Observable<IPurchaseDetail[]> {
    return this.http.get<IPurchaseDetail[]>(this.url + '/byPurchase/purchase_id' + id);
  }

  getPurchaseDetailByProductId(id: number): Observable<IPurchaseDetail[]> {
    return this.http.get<IPurchaseDetail[]>(this.url + '/byProduct/product_id' + id);
  }

  getPurchaseDetailByPurchaseIdAndProductId(purchase_id: number, product_id: number): Observable<IPurchaseDetail[]> {
    return this.http.get<IPurchaseDetail[]>(this.url + '/byPurchase/purchase_id' + purchase_id + '/byProduct/product_id' + product_id);
  }

  getRandomPurchaseDetail(): Observable<IPurchaseDetail> {
    return this.http.get<IPurchaseDetail>(this.url + '/random');
  }

  getPurchaseDetailPage(size: number, page: number, sort: string, direction: string, product_id: number, purchase_id: number): Observable<IPurchaseDetailPage> {
    return this.http.get<IPurchaseDetailPage>(this.url + '?size=' + size + '&page=' + page + '&sort=' + sort + ',' + direction + '&product_id=' + product_id + '&purchase_id=' + purchase_id);
  }

  getPurchaseDetailByPriceDesc(): Observable<IPurchaseDetail[]> {
    return this.http.get<IPurchaseDetail[]>(this.url + '/byPriceDesc');
  }

  getPurchaseDetailByPriceAsc(): Observable<IPurchaseDetail[]> {
    return this.http.get<IPurchaseDetail[]>(this.url + '/byPriceAsc');
  }

  updatePurchaseDetail(purchaseDetail: IPurchaseDetail): Observable<IPurchaseDetail> {
    return this.http.put<IPurchaseDetail>(this.url, purchaseDetail);
  }

  deletePurchaseDetail(id: number | undefined): Observable<number> {
    return this.http.delete<number>(this.url + '/' + id);
  }

  deleteAllPurchaseDetail(): Observable<number> {
    return this.http.delete<number>(this.url + '/empty');
  }

}
