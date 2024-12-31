import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharindDataService } from '../../services/sharind-data.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'catalog',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit {
  products!: Product[];

  constructor(
    private productService: ProductService,
    private sharingDataService: SharindDataService
  ) {}

  ngOnInit(): void {
    this.products = this.productService.findAll();
  }

  onAddCart(product: Product) {
    this.sharingDataService.productEventEmitter.emit(product);
  }
}
