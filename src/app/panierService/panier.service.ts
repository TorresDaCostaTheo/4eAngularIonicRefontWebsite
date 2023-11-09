import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private _storage: Storage | null = null;

  constructor(private storage:Storage) {this.init() }
  /**
   * Initialise le stockage local
   */
  async init(){
    this._storage =await this.storage.create();
    this._storage.set('produitsCart',[]);
  }
  /**
   *  Ajoute les produit dans le stockage local
   * @param produit
   * @returns
   */
  async addProduit(produit:{id:number,quantity:number}[]){
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
