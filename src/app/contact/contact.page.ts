import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage {

  valErreur: string | undefined;

  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  async afficherErreur() {
    const pokemonId = 0; // Ici je mets 0 pour récupérer des erreurs

    try {
      const data: any = await this.http.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`).toPromise();
      console.log('Ça ne devrais pas arrivé');
    } catch (error:any) {
      // console.error('Erreur lors de la récupération des données:', error);
      //this.afficherToast('Erreur lors de la récupération des données: ' + error.status);
    }
  }

  async afficherToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom' // Vous pouvez ajuster la position du toast selon vos besoins
    });
    toast.present();
  }
}
