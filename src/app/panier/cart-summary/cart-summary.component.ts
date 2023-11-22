import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss'],
})
export class CartSummaryComponent  implements OnInit {
  @Input({required:true})
  restaurants:Restaurant[]=[];
  @Input({required:true,alias:"totalCart"})
  total:number = 0;
  selectedRestaurant:string = ""
  callbackData:(data:any)=>void = ()=>{};
  constructor() { }
  restaurantSelected(data:any){
    console.log(data);
    this.selectedRestaurant = data;
  }
  @Output() confirmCallback: EventEmitter<any> = new EventEmitter();
  confirmOrder(){
    this.confirmCallback.emit(this.selectedRestaurant);
  }
  emptyCart(){
    this.confirmCallback.emit({empty:true});
  }
  ngOnInit() {}

}
