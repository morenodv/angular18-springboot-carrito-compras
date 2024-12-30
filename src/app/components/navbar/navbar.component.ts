import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CartComponent } from '../cart/cart.component';
import { Product } from '../../models/product';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CartComponent],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() productEventEmiter: EventEmitter<Product> = new EventEmitter();
  @Input() items: CartItem[] = [];

  @Output() openEventEmitter = new EventEmitter();

  openShowCart(): void{
    this.openEventEmitter.emit();
  }



}
