import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProductPageRoutingModule } from './list-product-routing.module';

import { ListProductPage } from './list-product.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListProductPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProductPageRoutingModule,
    SharedModule,
  ],
})
export class ListProductPageModule {}
