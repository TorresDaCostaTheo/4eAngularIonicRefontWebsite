import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Produit } from '../models/produit';
import { ProductService } from '../services/product.service';
import { Product } from '../models/productModel';
import { Restaurant } from '../models/restaurant';
import { RestaurantsService } from '../services/restaurants.service';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private _storage: Storage | null = null;
  private _produits:Produit[]=[];
  private _restaurants:Restaurant[]=[];
  private _callbackProduct:()=>void = ()=>{};
  constructor(private storage:Storage,private productService:ProductService,private restaurantService:RestaurantsService) {this.init() }
  /**
   * Initialise le stockage local
   */
  async init(){
    this._storage =await this.storage.create();
    this._storage.set('produitsCart',[]);


  }
  set callback(callback:()=>void){
    this._callbackProduct = callback;
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
      this._callbackProduct();
    }
   })
  }
  requestRestaurants(){
    this.restaurantService.getRestaurants().subscribe((restaurants)=>{
      console.log(restaurants);
      this._restaurants.push(...restaurants.map((value,i) =>{
        const v:Restaurant = {
          description : value.description,
          name : value.name,
          image : value.image,
        }
        return v;
      }));
      if(restaurants){
        this._restaurants = restaurants;
      }
      else{
        this._restaurants = [];
      }
    })
    console.log(this._restaurants);
  }
  get restaurants():Restaurant[]{
    return this._restaurants;
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
        Promise.resolve("Produit ajouté au panier")})
      .catch((error)=>{Promise.reject(error)
        });
    })
  }
}
