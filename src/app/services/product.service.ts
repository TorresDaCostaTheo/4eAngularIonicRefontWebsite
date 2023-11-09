import { Injectable } from '@angular/core';
import { Product } from '../models/productModel';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>('assets/data/ListProduct.json');
  }
}
