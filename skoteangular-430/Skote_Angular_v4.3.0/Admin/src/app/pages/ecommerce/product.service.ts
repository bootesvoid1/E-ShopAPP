import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { productModel } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: productModel[] = [];
  private updatedProducts = new Subject<productModel[]>();
  private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}



  storeProductData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, data);
  }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  deleteProduct(product: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${product._id}`);
  }




  }

