export class Produit{
  private _id: number = -1;
  private _name: string = "unknown";
  private _price: number = 0.00;
  private _quantity: number = 0;
  constructor(id:number,name:string,price:number,quantity:number){
    this._id=id;
    this._name=name;
    this._price=price;
    this._quantity=quantity;
  }
  get id(): number {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get price(): number {
    return this._price
  }
  get quantity(): number {
    return this._quantity;
  }
  get shortProduit(): {id:number,quantity:number} {
    return {id:this._id,quantity:this._quantity};
  }
}
