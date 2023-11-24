import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.page.html',
  styleUrls: ['./produits.page.scss'],
})
export class ProduitsPage implements OnInit {
  constructor(
    private router: Router,
    private toastController: ToastController,
    private route: ActivatedRoute
    ) {}

    ngOnInit() {
      const isRedirected = this.route.snapshot.data['isRedirected'];
      if (isRedirected) {
        this.presentToast();
      }
    }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Erreur d'url",
      duration: 1500,
      position: 'top',
      color: 'danger',
    });
    toast.present();
  }

  goToCategoryPage(category: number) {
    let navigationExtras: NavigationExtras = {
      state: {
        category: category,
      },
    };
    this.router.navigate(['/list-product'], navigationExtras);
  }
}
