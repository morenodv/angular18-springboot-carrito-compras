import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnChanges{

  @Input() items: CartItem[] = [];
  @Input() total: number = 0;

  @Output() idProductEventEmitter = new EventEmitter();


  onDeleteCart(id: number){
    this.idProductEventEmitter.emit(id);
  }

  calculateTotal(): void {
    this.total = this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  ngOnChanges(changes: SimpleChanges): void {
    // let itemsChanges = changes['items'];
    this.calculateTotal();
    this.saveSession();
  }



}
