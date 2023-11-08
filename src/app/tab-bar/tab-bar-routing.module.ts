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
        children:[]
      },
      {
        path:'bateaux',
        children:[]

      },
      {
        path:'restaurants',
        children:[]
      },
      {
        path:'recettes',
        children:[]
      },
      {
        path:'contact',
        children:[]
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
