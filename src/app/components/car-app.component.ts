import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CartComponent } from './cart/cart.component';
import { CartItem } from '../models/cartItem';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, ProductCardComponent, CartComponent],
  templateUrl: './car-app.component.html'
})
export class CarAppComponent implements OnInit {


  products: Product[] = [];

  items: CartItem[] = [];

  constructor(private service: ProductService){

  }
  ngOnInit(): void {
    this.products = this.service.findAll();
    }

    onAddCart(product: Product){
      const hasItem = this.items.find( item => item.product.id === product.id);
      if(hasItem){
        this.items = this.items.map(item =>{
          if(item.product.id === product.id) {
            return {
              ... item,
              quantity: item.quantity + 1
            }
          }
          return item;
        })
      } else {
        this.items = [... this.items, { product : { ... product }, quantity: 1 }]
      }
    }
}
