import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../models/productModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ProduitModalComponent } from '../produit-modal/produit-modal.component';
import { PanierService } from '../panierService/panier.service';
import { Produit } from '../models/produit';

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
    private modalCtrl: ModalController,
    private panierService: PanierService
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
          if (category == 4 && product.sale) {
            this.listProducts.push(product);
          } else if (product.category === category) {
            this.listProducts.push(product);
          }
        });
      },
      (err) => {
        console.log('error');
      }
    );
  }
  findByID(id: number) {
    let idFinded = this.panierService._produits.some(
      (produit) => produit.id === id
    );
    return idFinded;
  }
  findQuantityByID(id: number) {
    let productFinded = this.panierService._produits.find(
      (produit) => produit.id === id
    );
    if (productFinded) {
      return productFinded.quantity;
    } else {
      return 0;
    }
  }

  async openModal(idProduit: number, nameProduct: string) {
    /* console.table(this.panierService._produits);
    console.log(typeof this.panierService._produits);
    console.table(this.panierService._produits);
    console.log(typeof this.panierService._produits); */
    const modal = await this.modalCtrl.create({
      component: ProduitModalComponent,
      componentProps: {
        idProduit: idProduit,
        nameProduct: nameProduct,
      },
    });

    modal.onDidDismiss().then(async (data) => {
      if (data && data.data) {
        if (data.data.nbProduct <= 0) {
          return;
        }
        if (!this.findByID(idProduit)) {
          console.table(this.panierService._produits);
          this.panierService.produit = {
            idProduit: idProduit,
            quantity: data.data.nbProduct,
          };
        } else {
          let oldQuantity = this.findQuantityByID(idProduit);
          let produitsCart = await this.panierService._storage.get(
            'produitsCart'
          );
          produitsCart = produitsCart.filter(
            (produit: { id: number; quantity: number }) =>
              produit.id !== idProduit
          );

          await this.panierService._storage.set('produitsCart', produitsCart);
          const result = this.panierService.produits.splice(
            this.panierService.produits.findIndex(
              (produit: Produit) => produit.id == idProduit
            ),
            1
          );
          this.panierService.produit = {
            idProduit: idProduit,
            quantity: data.data.nbProduct + oldQuantity,
          };
        }
      }
    });

    await modal.present();
  }
}
