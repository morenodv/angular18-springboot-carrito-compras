import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharindDataService } from '../services/sharind-data.service';
import Swal from 'sweetalert2';
import { ItemState } from '../store/items.reducer';
import { add, remove, total } from '../store/item.actions';
import { Store } from '@ngrx/store';


@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './car-app.component.html',
})
export class CarAppComponent implements OnInit {
  // products: Product[] = [];

  items: CartItem[] = [];


  // showCart: boolean = false;

  constructor(
    private router: Router,
    private sharingDataService: SharindDataService,
    private store: Store<{items: ItemState}>
  ) {
    this.store.select('items').subscribe(state => {
      this.items = state.items;
      // this.total = state.total;
      this.saveSession();
      console.log('cambio el estado');
    })
  }
  ngOnInit(): void {
    // this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    // this.calculateTotal();
    // this.store.dispatch(total());
    this.store.dispatch(total());
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart() {
    this.sharingDataService.productEventEmitter.subscribe((product) => {
      this.store.dispatch(add({ product }));
      this.store.dispatch(total());
      // this.calculateTotal();
      // this.saveSession();
      this.router.navigate(['/cart']);
      Swal.fire({
        title: 'Shopping Cart',
        text: 'Nuevo producto agregado',
        icon: 'success',
      });
    });
  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe((id) => {

      Swal.fire({
        title: 'Esta seguro que desea eliminar el item?',
        text: 'El item se eliminara',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminarlo!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(remove({id}));
          this.store.dispatch(total());
          this.router.navigate(['/cart']);

          // this.items = this.items.filter((item) => item.product.id !== id);
          // if (this.items.length == 0) {
          //   sessionStorage.removeItem('cart');
          //   sessionStorage.clear();
          // }
          // this.calculateTotal();
          // this.saveSession();
          Swal.fire({
            title: 'Eliminado!',
            text: 'Se ha eliminado el item.',
            icon: 'success',
          });
        }
      });
    });
  }
/////se movio a items.reducer (state)
  // calculateTotal(): void {
  //   this.total = this.items.reduce(
  //     (total, item) => total + item.product.price * item.quantity,
  //     0
  //   );
  // }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  // openShowCart(): void{
  //   this.showCart = !this.showCart;
  // }
}
