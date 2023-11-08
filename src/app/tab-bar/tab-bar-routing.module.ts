import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabBarPage } from './tab-bar.page';

const routes: Routes = [
  {
    path: '',
    component: TabBarPage,
    children: [
      {
        path:'produits',
        children:[
          {
            path:'',
            loadChildren: () => import('../produits/produits.module').then( m => m.ProduitsPageModule)
          }
        ]
      },
      {
        path:'bateaux',
        children:[
          {
            path:'',
            loadChildren: () => import('../bateaux/bateaux.module').then( m => m.BateauxPageModule)
          }
        ]
      },
      {
        path:'restaurants',
        children:[
          {
            path:'',
            loadChildren: () => import('../restaurants/restaurants.module').then( m => m.RestaurantsPageModule)
          }
        ]
      },
      {
        path:'recettes',
        children:[
          {
            path:'',
            loadChildren: () => import('../recettes/recettes.module').then( m => m.RecettesPageModule)
          }
        ]
      },
      {
        path:'contact',
        children:[
           {
            path:'',
            loadChildren: () => import('../contact/contact.module').then( m => m.ContactPageModule)
           }
        ]
      },
      {
        path: 'panier',
        loadChildren: () => import('../panier/panier.module').then( m => m.PanierPageModule)
      },
      {
        path: '',
        redirectTo:'produits',
        pathMatch:'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabBarPageRoutingModule {}
