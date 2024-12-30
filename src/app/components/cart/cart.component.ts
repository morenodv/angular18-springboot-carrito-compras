import { Component, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Router } from '@angular/router';
import { SharindDataService } from '../../services/sharind-data.service';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html'
})
export class CartComponent{

  items: CartItem[] = [];
  total: number = 0;




  constructor(private sharingDataService: SharindDataService, private router: Router){
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
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
