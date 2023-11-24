import { formatDate } from '@angular/common';
import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';

@Component({
  selector: 'app-date-calculator',
  templateUrl: './date-calculator.component.html',
  styleUrls: ['./date-calculator.component.scss'],
})
export class DateCalculatorComponent  implements OnInit {
  @Input()
  private openDayDate:number[]=[0,6,3];
  selectedDate:string ="0/0";
  constructor() { }
  ngOnInit() {
    this.calculateDeliveryDate();
  }

  //Méthode permettant de calculer le jour de livraison le plus proche en fonction de la date d'aujourd'hui
  calculateDeliveryDate(){
    let today = new Date(Date.now());
    if(this.openDayDate.length === 0){ return;}
    const result =this.openDayDate.sort((a,b)=>{
      if(a< today.getDay()){
        a += 7;
      }
      if(b< today.getDay()){
        b += 7;
      }
      const diffA = Math.abs(a-today.getDay());
      const diffB = Math.abs(b-today.getDay());
      return diffA-diffB;
    });
    let day = today.getDay();
    if(day<=result[0]){
      today.setDate(today.getDate()+result[0]-day);
    }
    else{
      today.setDate(today.getDate()+7-day+result[0]);
    }
    this.selectedDate = formatDate(today,'dd/MM','fr-FR');
  }
  //Methode permettant de retourner la date de livraison
  @Output('deliveryDate')
  getDateLivraison(){
    return this.selectedDate;
  }

}
