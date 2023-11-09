import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HeaderComponent } from '../header/header.component';
import { ProduitModalComponent } from '../produit-modal/produit-modal.component';

@NgModule({
  declarations: [HeaderComponent, ProduitModalComponent],
  imports: [FormsModule, CommonModule, IonicModule],
  exports: [HeaderComponent, ProduitModalComponent],
})
export class SharedModule {}
