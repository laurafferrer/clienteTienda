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

  getCategoriesPage(page:number, size: number, sort: string, direction: string): Observable<ICategoryPage> {
    return this.http.get<ICategoryPage>(this.url + '?page=' + page + '&size=' + size + '&sort=' + sort + ',' + direction);
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
    return this.http.post<number>(this.url + '/populate/', amount, {});
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
