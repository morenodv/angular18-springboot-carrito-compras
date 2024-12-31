import { Component, EventEmitter, Input } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CartComponent } from '../cart/cart.component';
import { Product } from '../../models/product';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CartComponent, RouterModule],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  @Input() productEventEmiter: EventEmitter<Product> = new EventEmitter();
  @Input() items: CartItem[] = [];
  @Input() total: number = 0;
  // @Input() products: Product[] = [];

  // @Output() openEventEmitter = new EventEmitter();

  // openShowCart(): void{
  //   this.openEventEmitter.emit();
  // }



}
