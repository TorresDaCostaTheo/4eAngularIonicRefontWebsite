import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ProduitsPage } from './produits/produits.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tab-bar/tab-bar.module').then((m) => m.TabBarPageModule),
  },
  {
    path: 'single-restaurant',
    loadChildren: () => import('./single-restaurant/single-restaurant.module').then( m => m.SingleRestaurantPageModule)
  },
  {
    path: 'single-bateau',
    loadChildren: () => import('./single-bateau/single-bateau.module').then( m => m.SingleBateauPageModule)
  },
  {
    path: 'single-recette',
    loadChildren: () => import('./single-recette/single-recette.module').then( m => m.SingleRecettePageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./error/error.module').then( m => m.ErrorPageModule)
  },  
  {
    path: '**',
    component: ProduitsPage,
    data: {
      isRedirected: true,
    },
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
