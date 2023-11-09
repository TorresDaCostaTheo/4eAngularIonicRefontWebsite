import { Component, OnInit } from '@angular/core';
import { Bateau } from '../models/bateau';
import { NavigationExtras, Router } from '@angular/router';
import { BateauxService } from '../services/bateaux.service';

@Component({
  selector: 'app-bateaux',
  templateUrl: './bateaux.page.html',
  styleUrls: ['./bateaux.page.scss'],
})
export class BateauxPage implements OnInit {

  bateauxList!: Bateau[];

  constructor(
    private router: Router,
    private bateauxService: BateauxService
  ) {}

  ngOnInit() {
    this.bateauxService.getBateaux().subscribe(
      (res) => {
        this.bateauxList = res;
      },
      (err) => {
        console.log('error');
      }
    );
    this.bateauxList = this.bateauxService.bateauList;
  }

  goToSingleBateau(bateau: { name: string; description: string[] }) {
    let navigationExtras: NavigationExtras = {
      state: {
        bateau: bateau,
      },
    };
    this.router.navigate(['/single-bateau'], navigationExtras);
  }

}
