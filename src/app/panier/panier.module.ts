import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanierPageRoutingModule } from './panier-routing.module';

import { PanierPage } from './panier.page';
import { SharedModule } from '../shared/shared.module';
import { DateCalculatorComponent } from './date-calculator/date-calculator.component';
import { CartSummaryComponent } from './cart-summary/cart-summary.component';
import { ConfirmCheckoutComponent } from './confirm-checkout/confirm-checkout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanierPageRoutingModule,
    SharedModule,

  ],
  declarations: [PanierPage,DateCalculatorComponent,CartSummaryComponent,ConfirmCheckoutComponent]
})
export class PanierPageModule {}
