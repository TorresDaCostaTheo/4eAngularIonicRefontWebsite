import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SingleRecettePageRoutingModule } from './single-recette-routing.module';

import { SingleRecettePage } from './single-recette.page';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [SingleRecettePage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SingleRecettePageRoutingModule,
        SharedModule
    ]
})
export class SingleRecettePageModule {}
