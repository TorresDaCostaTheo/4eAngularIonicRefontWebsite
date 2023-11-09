import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.page.html',
  styleUrls: ['./produits.page.scss'],
})
export class ProduitsPage implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goToCategoryPage(category: number) {
    this.router.navigate(['/list-product']);
  }
}
