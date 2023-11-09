import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.page.html',
  styleUrls: ['./produits.page.scss'],
})
export class ProduitsPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToCategoryPage(category: number) {
    let navigationExtras: NavigationExtras = {
      state: {
        category: category,
      },
    };
    this.router.navigate(['/list-product'], navigationExtras);
  }
}
