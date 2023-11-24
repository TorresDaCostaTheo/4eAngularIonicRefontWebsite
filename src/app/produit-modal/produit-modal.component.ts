import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-produit-modal',
  templateUrl: './produit-modal.component.html',
  styleUrls: ['./produit-modal.component.scss'],
})
export class ProduitModalComponent implements OnInit {
  idProduct: number;
  nbProduct!: number;
  nameProduct: string;
  constructor(
    private navParams: NavParams,
    private modalCtrl: ModalController
  ) {
    this.idProduct = this.navParams.get('idProduct');
    this.nameProduct = this.navParams.get('nameProduct');
  }
  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss({
      nbProduct: this.nbProduct,
      idProduct: this.idProduct,
    });
  }
}
