import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from '../models/produit';
import { PanierService } from '../panierService/panier.service';
import { HttpClient } from '@angular/common/http';
import { Restaurant } from '../models/restaurant';
import { AlertController, ModalController } from '@ionic/angular';
import { ConfirmCheckoutComponent } from './confirm-checkout/confirm-checkout.component';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {
  restaurants: Restaurant[] = this.panierService.restaurants;
  produitsCart: Produit[] = this.panierService.produits;
  restaurantSelect: Restaurant | undefined = undefined;
  sum: number = 0;

  constructor(private modalCtr:ModalController,private panierService:PanierService,private alertController:AlertController) {
  }
  /**
   * Initialise le composant
   */
  ngOnInit() {
    this.panierService.callback = () => {
      this.sumTotal();
    };
  }
  /**
   * Envoie les produits au panier
   */
  async submitProduit() {
    this.deleteAllProduit();
    this.panierService._storage.set('produitsCart', []);
  }
  /**
   *  Supprime le produit du panier
   * @param id
   */
  async deleteProduit(id: number) {
    let produitsCart = await this.panierService._storage.get('produitsCart');
    produitsCart = produitsCart.filter(
      (produit: { id: number; quantity: number }) => produit.id !== id
    );

    // Sauvegarder le tableau mis à jour
    await this.panierService._storage.set('produitsCart', produitsCart);
    console.table(this.produitsCart);
    const result = this.produitsCart.splice(
      this.produitsCart.findIndex((produit: Produit) => produit.id == id),
      1
    );
    console.table(this.produitsCart);
    if (result) {
      this.sumTotal();
    }
  }
  async deleteAllProduit() {
    console.table(this.produitsCart);
    await this.panierService._storage.set('produitsCart', []);

    this.produitsCart.splice(0, this.produitsCart.length);

    console.table(this.produitsCart);
    this.sumTotal();
  }
  async confirmOrder(data:string|{empty:boolean}){
    const confirmModal= await this.modalCtr.create({component:ConfirmCheckoutComponent,componentProps:{
      'confirmText':'Validation de la commande',
      'errorText':'Annuler la commande',
      'timerOut':2000,
    }})

    if(typeof data === "object"){
      if(data.empty){
        this.deleteAllProduit();
      }
      return;
    }
    this.restaurantSelect = this.restaurants.find(
      (restaurant: Restaurant) => restaurant.name == data
    );
    const alert = await this.alertController.create({
      header: 'Confirmation du panier',
      message:
        "Voulez-vous confirmer l'achat ?\n Cette action est irréversible",
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
            confirmModal.present();
            confirmModal.onDidDismiss().then((data)=>{
              this.submitProduit().then(()=>{

              })
            })

          }
        }
      ]
    })
    await alert.present();
  }
  /**
   *  Calcul la somme total des produits
   */
  sumTotal() {
    this.sum = this.produitsCart.reduce(
      (sum: number, produit: Produit) => sum + produit.price * produit.quantity,
      0
    );
  }
}
