import { RecettesService } from './../services/recettes.service';
import { Recette } from './../models/recetteModel';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-recettes',
  templateUrl: './recettes.page.html',
  styleUrls: ['./recettes.page.scss'],
})
export class RecettesPage implements OnInit {

  recettesList: Recette[]=[];

  constructor(private router: Router, private recettesService: RecettesService) { }

  ngOnInit() {
    this.recettesService.getRecettes().subscribe(
      (res) => {
        this.recettesList = res;
      },
      (err) => {
        console.log('error');
      }
    );
    this.recettesList = this.recettesService.recetteList;
  }

  goToSingleRecette(recette:Recette) {
    let navigationExtras: NavigationExtras = {
      state: {
        recette: recette,
      },
    };
    this.router.navigate(['/single-recette'], navigationExtras);
  }
}
