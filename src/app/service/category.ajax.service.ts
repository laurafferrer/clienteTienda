import { Injectable } from '@angular/core';
import { API_URL } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ICategory, ICategoryPage } from '../model/model.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryAjaxService {

  private url = API_URL + '/category';

constructor(private http: HttpClient) { }

  getCategoryById(id: number) {
    return this.http.get<ICategory>(this.url + '/' + id);
  }

  getPageCategory(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string, strFilter?: string): Observable<ICategoryPage> {
    let sUrl_filter: string;
    if (!size) size = 10;
    if (!page) page = 0;
    if (strFilter && strFilter.trim().length > 0) {
      sUrl_filter = `&filter=${strFilter}`;
    } else {
      sUrl_filter = "";
    }
    return this.http.get<ICategoryPage>(this.url + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection + sUrl_filter);
  }

  getCategoriesRandom(): Observable<ICategory> {
    return this.http.get<ICategory>(this.url + '/random');
  }

  getCategoryQuantityProductsAsc(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.url + '/quantityProductsAsc');
  }

  createCategory(category: ICategory) {
    return this.http.post<ICategory>(this.url, category);
  }

  generateCategories(amount: number): Observable<number> {
    return this.http.post<number>(this.url + '/populate/' + amount, {});
  }

  updateCategory(category: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(this.url, category);
  }

  deleteCategory(id: number | undefined): Observable<number> {
    return this.http.delete<number>(this.url + '/' + id);
  }

  deleteAllCategories(): Observable<number> {
    return this.http.delete<number>(this.url + '/empty');
  }

}
