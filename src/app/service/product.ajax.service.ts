import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { API_URL } from '../../environment/environment';
import { Observable } from 'rxjs';
import { IProduct, IProductPage } from '../model/model.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductAjaxService {

  private url = API_URL + '/product';

  constructor(private http: HttpClient) { }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(this.url + '/' + id);
  }

  getPageProducts(size: number | undefined, page: number | undefined, sort: string, direction: string): Observable<IProductPage> {
    return this.http.get<IProductPage>(this.url + '&size=' + size + '?page=' + page  + '&sort=' + sort + ',' + direction);
  }

  getProductRandom(): Observable<IProduct> {
    return this.http.get<IProduct>(this.url + '/random');
  }

  getProductsByCategory(category_id: number, page: number, size: number, sort: string, direction: string): Observable<IProductPage> {
    return this.http.get<IProductPage>(this.url + '/category/' + category_id + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
  }

  getProductsByStockAsc(stock: number, page: number, size: number, sort: string, direction: string): Observable<IProductPage> {
    return this.http.get<IProductPage>(this.url + '/stock/' + stock + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
  }

  getProductsByPriceAsc(price: number, page: number, size: number, sort: string, direction: string): Observable<IProductPage> {
    return this.http.get<IProductPage>(this.url + '/price/' + price + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
  }

  getProductsByPriceDesc(price: number, page: number, size: number, sort: string, direction: string): Observable<IProductPage> {
    return this.http.get<IProductPage>(this.url + '/price/' + price + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
  }

  getProductsByPriceAscAndCategory(category_id: number, price: number, page: number, size: number, sort: string, direction: string): Observable<IProductPage> {
    return this.http.get<IProductPage>(this.url + '/category/' + category_id + '/price/' + price + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
  }

  getProductsByPriceDescAndCategory(category_id: number, price: number, page: number, size: number, sort: string, direction: string): Observable<IProductPage> {
    return this.http.get<IProductPage>(this.url + '/category/' + category_id + '/price/' + price + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
  }

  searchProducts(searchText: string, page:number, size: number, sort: string, direction: string):  Observable<IProductPage> {
    return this.http.get<IProductPage>(this.url + '/search/' + searchText + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
  }

  getProductPrice(id: number): Observable<number> {
    return this.http.get<number>(this.url + '/price/' + id);
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.url, product);
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(this.url, product);
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this.http.delete<IProduct>(this.url + '/' + id);
  }

  deleteAllProducts(): Observable<number> {
    return this.http.delete<number>(this.url + '/empty');
  }




}
