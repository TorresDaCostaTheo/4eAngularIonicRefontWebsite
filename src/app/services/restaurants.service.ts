import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  restaurantList!: Restaurant[];
  constructor(private http: HttpClient) {}

  getRestaurants() {
    return this.http.get<Restaurant[]>('assets/data/ListRestaurant.json');
  }
}
