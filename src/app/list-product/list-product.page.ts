import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/productModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ProduitModalComponent } from '../produit-modal/produit-modal.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.page.html',
  styleUrls: ['./list-product.page.scss'],
})
export class ListProductPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  listProducts: Product[] = [];
  category: number = 0;
  message: string = 'test';
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    let listProductsTemporary: Product[];

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.category =
          this.router.getCurrentNavigation()?.extras.state?.['category'];
        this.getByCategory(this.category);
      }
    });
  }
  getByCategory(category: number) {
    this.listProducts = [];
    let listProductsTemporary: Product[];
    this.productService.getProducts().subscribe(
      (res) => {
        listProductsTemporary = res;
        listProductsTemporary.forEach((product) => {
          if (product.category === category) {
            console.log(product);
            console.table(this.listProducts);
            this.listProducts.push(product);
          }
        });
      },
      (err) => {
        console.log('error');
      }
    );
  }

  async openModal(idProduit: number) {
    const modal = await this.modalCtrl.create({
      component: ProduitModalComponent,
      componentProps: {
        idProduit: idProduit,
      },
    });

    modal.onDidDismiss().then((data) => {
      if (data && data.data) {
        console.log('nbProduct : ' + data.data.nbProduct);
      }
    });

    await modal.present();
  }
}
