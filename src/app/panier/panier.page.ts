import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import {Produit} from '../models/produit';
import { PanierService } from '../panierService/panier.service';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../models/restaurant';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {
  restaurants:Restaurant[] = this.panierService.restaurants;
  produitsCart:Produit[] = this.panierService.produits;
  selectedValue:string = "-1"
  sum:number = 0;

  constructor(private router:Router,private panierService:PanierService,private alertController:AlertController) {
  }
  /**
   * Initialise le composant
   */
  ngOnInit() {
    this.panierService.callback = ()=>{
      this.sumTotal()
    }
  }
  /**
   * Envoie les produits au panier
   */
  async submitProduit(){
   return this.panierService.submitProduit(this.produitsCart.map((produit:Produit)=>produit.shortProduit))
    .then((result)=>{
      console.log(result);
      return Promise.resolve()
     })
     .catch((error)=>{
        console.log(error);
        return Promise.reject()
     })
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
  deleteAllProduit(){
    this.produitsCart = [];
    this.sumTotal()
  }
  async confirmOrder(){
    const alert = await this.alertController.create({
      header: "Confirmation du panier",
      message: "Voulez-vous confirmer l'achat ?\n Cette action est irréversible",
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'danger',
        },
        {
          text: 'Confirmer',
          role: 'confirm',
          cssClass: 'primary',
          handler: () => {
            this.submitProduit().then(()=>{
              console.log("Commande valider")
            })
          }
        }
      ]
    })
    await alert.present();

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
