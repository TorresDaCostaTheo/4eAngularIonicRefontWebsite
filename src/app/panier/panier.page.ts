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
  produitsCart:Produit[] = [new Produit(0,"Poisson",100,1),new Produit(1,"Poisson",100,1)];
  sum:number = 0;
  constructor(private router:Router,private panierService:PanierService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['produitsCart']){
      this.produitsCart = changes['produitsCart'].currentValue;
      this.sumTotal()
    }
  }
  ngOnInit() {
    this.sumTotal()
  }
  submitProduit(){
    this.panierService.addProduit(this.produitsCart.map((produit:Produit)=>produit.shortProduit))
    .then((result)=>{console.log(result)}).catch((error)=>console.error(error));
  }
  goToProduit(id:number){
    this.router.navigate(['/produit',id]).then((result)=>{}).catch((error)=>{console.error("Une erreur c'est produite")});
  }
  deleteProduit(id:number){
    const result = this.produitsCart.splice(this.produitsCart.findIndex((produit:Produit)=>produit.id==id),1);
    if(result){
      alert('Produit supprimé avec succès')
    }
  }
  sumTotal(){
    this.sum = this.produitsCart.reduce((sum:number,produit:Produit)=>sum+produit.price,0);
  }

}
