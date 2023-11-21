import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { Router } from '@angular/router';
import { Restaurant } from '../models/restaurant';
import { RestaurantsService } from '../services/restaurants.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.page.html',
  styleUrls: ['./restaurants.page.scss'],
})
export class RestaurantsPage implements OnInit {
  restautantsList!: Restaurant[];

  constructor(
    private router: Router,
    private restaurantsService: RestaurantsService
  ) {}

  ngOnInit() {
    this.restaurantsService.getRestaurants().subscribe(
      (res) => {
        this.restautantsList = res;
      },
      (err) => {
        console.log('error');
      }
    );
    this.restautantsList = this.restaurantsService.restaurantList;
  }

  goToSingleRestaurant(restaurant: { name: string; adresse:string,description: string[] }) {
    let navigationExtras: NavigationExtras = {
      state: {
        restaurant: restaurant,
      },
    };
    this.router.navigate(['/single-restaurant'], navigationExtras);
  }

}
