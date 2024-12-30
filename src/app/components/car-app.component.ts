import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CatalogComponent } from './catalog/catalog.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CartComponent } from './cart/cart.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, ProductCardComponent, CartComponent, NavbarComponent],
  templateUrl: './car-app.component.html',
})
export class CarAppComponent implements OnInit {
  products: Product[] = [];

  items: CartItem[] = [];

  total: number = 0;

  showCart: boolean = false;


  constructor(private service: ProductService) {}
  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
  }

  onAddCart(product: Product) {
    const hasItem = this.items.find((item) => item.product.id === product.id);
    if (hasItem) {
      this.items = this.items.map((item) => {
        if (item.product.id === product.id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    } else {
      this.items = [...this.items, { product: { ...product }, quantity: 1 }];
    }
    this.calculateTotal();
    this.saveSession();
  }

  onDeleteCart(id: number): void {
    this.items = this.items.filter(item => item.product.id !== id);
    this.calculateTotal();
    this.saveSession();
  }

  calculateTotal(): void {
    this.total = this.items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  openShowCart(): void{
    this.showCart = !this.showCart;
  }

}
