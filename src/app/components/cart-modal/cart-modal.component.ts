import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart-modal',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './cart-modal.component.html'
})
export class CartModalComponent {

  @Input() items: CartItem[] = [];
  // @Input() total: number = 0;
  @Output() openEventEmitter = new EventEmitter();
  @Output() idProductEventEmitter = new EventEmitter();


  openShowCart(): void{
    this.openEventEmitter.emit();
  }

  onDeleteCart(id: number){
    this.idProductEventEmitter.emit(id);
  }

}
