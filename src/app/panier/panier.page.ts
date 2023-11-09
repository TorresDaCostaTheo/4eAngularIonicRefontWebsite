import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import {Produit} from '../models/produit';
import { PanierService } from '../panierService/panier.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit,OnChanges {
  restaurantName:{id:number,address:string}[] = Array(4).fill({id:0,address:"Jean jaures"});
  produitsCart:Produit[] = this.panierService.produits;
  selectedValue:string = "-1"
  sum:number = 0;

  constructor(private router:Router,private panierService:PanierService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.sumTotal()
  }

  /**
   * Initialise le composant
   */
  ngOnInit() {
    this.sumTotal()
  }
  /**
   * Envoie les produits au panier
   */
  submitProduit(){
    this.panierService.submitProduit(this.produitsCart.map((produit:Produit)=>produit.shortProduit))
    .then((result)=>{console.log(result)}).catch((error)=>console.error(error));
  }
  /**
   *  Supprime le produit du panier
   * @param id
   */
  deleteProduit(id:number){
    const result = this.produitsCart.splice(this.produitsCart.findIndex((produit:Produit)=>produit.id==id),1);
    if(result){
      this.sumTotal()
    }
  }
  /**
   *  Donne le restaurant sélectionner
   * @param event
   */
  restaurantSelected(){
    console.log(this.selectedValue);

  }
  /**
   *  Calcul la somme total des produits
   */
  sumTotal(){
    this.sum = this.produitsCart.reduce((sum:number,produit:Produit)=>sum+produit.price*produit.quantity,0);
    console.log(this.sum);

  }

}
