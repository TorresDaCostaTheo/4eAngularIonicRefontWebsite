import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-recette',
  templateUrl: './single-recette.page.html',
  styleUrls: ['./single-recette.page.scss'],
})
export class SingleRecettePage implements OnInit {
  recette: {
    name: string;
    ingredients: string[];
    description: string[];
  } = { name: '', ingredients:[''], description: [''] };
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.recette =
          this.router.getCurrentNavigation()?.extras.state?.['recette'];
        console.log(this.recette);
      }
    });
  }

}
