import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { SharindDataService } from '../../services/sharind-data.service';
import { Store } from '@ngrx/store';
import { ItemState } from '../../store/items.reducer';
import { total } from '../../store/item.actions';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit{

  items: CartItem[] = [];
  total: number = 0;




  constructor(
    private sharingDataService: SharindDataService,
    private store: Store<{items: ItemState}>
){
    this.store.select('items').subscribe(state => { 
      this.items = state.items;
      this.total = state.total;
    });
  }

  ngOnInit(): void {
  }

  onDeleteCart(id: number){
    this.sharingDataService.idProductEventEmitter.emit(id);
    // this.idProductEventEmitter.emit(id);
  }
  // calculateTotal(): void {
  //   this.total = this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  // }

  // saveSession(): void {
  //   sessionStorage.setItem('cart', JSON.stringify(this.items));
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   // let itemsChanges = changes['items'];
  //   this.calculateTotal();
  //   this.saveSession();
  // }



}
