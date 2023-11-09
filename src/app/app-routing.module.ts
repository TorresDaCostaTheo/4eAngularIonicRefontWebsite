import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tab-bar/tab-bar.module').then((m) => m.TabBarPageModule),
  },
  {
    path: 'single-restaurant',
    loadChildren: () => import('./single-restaurant/single-restaurant.module').then( m => m.SingleRestaurantPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
