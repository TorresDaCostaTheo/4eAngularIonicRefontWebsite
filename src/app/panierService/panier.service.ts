import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Produit } from '../models/produit';
import { ProductService } from '../services/product.service';
import { Product } from '../models/productModel';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private _storage: Storage | null = null;
  private _produits:Produit[]=[];
  constructor(private storage:Storage,private productService:ProductService) {this.init() }
  /**
   * Initialise le stockage local
   */
  async init(){
    this._storage =await this.storage.create();
    this._storage.set('produitsCart',[]);
  }
  set produit(cartProduct:{
    idProduit:number,
    quantity:number
  }){
   const product = this.productService.getProduct(cartProduct.idProduit)
   product.then((product:Product|undefined)=>{
    console.log(product);
    if(product){
      this._produits.push(new Produit(product.id,product.name,product.price,cartProduct.quantity));
    }
   })
  }
  get produits():Produit[]{return this._produits}

  /**
   *  Ajoute les produit dans le stockage local
   * @param produit
   * @returns
   */
  async submitProduit(produit:{id:number,quantity:number}[]){
   return this._storage?.get('produitsCart').then((produitsCart:{id:number,quantity:number}[])=>{
      const result = produit.filter(produit=>{ return !produitsCart.includes(produit)});
      if(result.length==0){
        return Promise.reject("Produit déjà ajouté");
      }else{
        produitsCart.push(...result);
      }
      console.log(produitsCart);
      return this._storage?.set('produitsCart',produitsCart)
      .then((result)=>{
        Promise.resolve(result)})
      .catch((error)=>{Promise.reject(error)
        });
    })
  }
}
