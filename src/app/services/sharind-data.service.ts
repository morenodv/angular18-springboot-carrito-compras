import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class SharindDataService {

  private _idProductEventEmitter: EventEmitter<number> = new EventEmitter();

  private _productEventEmiter: EventEmitter<Product> = new EventEmitter();



  constructor() { }

  get idProductEventEmitter(): EventEmitter<number>{
    return this._idProductEventEmitter;
  }

  get productEventEmitter(): EventEmitter<Product>{
    return this._productEventEmiter;
  }



}
