import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-restaurant',
  templateUrl: './single-restaurant.page.html',
  styleUrls: ['./single-restaurant.page.scss'],
})
export class SingleRestaurantPage implements OnInit {
  restaurant: {
    name: string;
    description: string[];
  } = { name: '', description: [''] };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.restaurant =
          this.router.getCurrentNavigation()?.extras.state?.['restaurant'];
        console.log(this.restaurant);
      }
    });
  }

}
