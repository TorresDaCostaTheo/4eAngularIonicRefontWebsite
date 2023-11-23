import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PanierService } from 'src/app/panierService/panier.service';

@Component({
  selector: 'app-confirm-checkout',
  templateUrl: './confirm-checkout.component.html',
  styleUrls: ['./confirm-checkout.component.scss','./loading-circle.scss'],
})
export class ConfirmCheckoutComponent  implements OnInit {
  @Input()
  confirmText = "Validation de la commande"
  @Input()
  errorText = "Erreur lors de la validation de la commande"
  finishText = "Commande validée"
  showText = false;
  @Input()
  timerOut:number = 2000;
  constructor(private renderer2:Renderer2,private modalCtr:ModalController,private panierService:PanierService) { }

  ngOnInit() {this.circleComplete();
  }

  circleComplete(){
    setTimeout(()=>{
      console.log("circle complete");
      this.validate()
    },1500)
  }
  @Input()
  validate(){
    console.log("validate")
    this.renderer2.addClass(document.querySelector('.circle-loader'),"load-complete")
    this.renderer2.setStyle(document.querySelector('.checkmark'),"display","block")
    this.showText = true;
    setTimeout(()=>{
      this.modalCtr.dismiss(null);
    },this.timerOut)
  }
}
