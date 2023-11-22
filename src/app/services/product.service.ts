import { Injectable } from '@angular/core';
import { Product } from '../models/productModel';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>('assets/data/ListProduct.json');
  }
   async getProduct(id:number){
    let product:Product|undefined;
    return firstValueFrom(this.getProducts()).then((products:Product[])=>{
      return product = products.find((product)=>{return product.id==id})
    })
  }
}
