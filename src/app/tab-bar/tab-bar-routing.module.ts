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
        children: [
          {
          path: '',
          loadChildren: () => import('../panier/panier.module').then( m => m.PanierPageModule)
        }
      ]
      },{
        path: 'list-product',
        children:[
          {
            path:'',
            loadChildren: () => import('../list-product/list-product.module').then( m => m.ListProductPageModule)
          }
        ]},{
          path: 'single-bateau',
          children:[
            {
              path:'',
              loadChildren: () => import('../single-bateau/single-bateau.module').then( m => m.SingleBateauPageModule)
            }
          ]}
          ,{
            path: 'single-restaurant',
            children:[
              {
                path:'',
                loadChildren: () => import('../single-restaurant/single-restaurant.module').then( m => m.SingleRestaurantPageModule)
              }
            ]},
          {
            path: 'single-recette',
            children:[
              {
                path:'',
                loadChildren: () => import('../single-recette/single-recette.module').then( m => m.SingleRecettePageModule)
              }
            ]},
      
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