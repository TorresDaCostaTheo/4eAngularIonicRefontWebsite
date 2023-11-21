import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  constructor(private toastController: ToastController) {}  
  ngOnInit(){}

  async presentToast(position:'bottom') {
    const toast = await this.toastController.create({
      message: 'Erreur 505',
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}
