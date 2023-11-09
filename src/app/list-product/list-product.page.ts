import { Component, OnInit } from '@angular/core';
import { Product } from '../models/productModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.page.html',
  styleUrls: ['./list-product.page.scss'],
})
export class ListProductPage implements OnInit {
  listProducts: Product[] = [];
  category: number = 0;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
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
}
