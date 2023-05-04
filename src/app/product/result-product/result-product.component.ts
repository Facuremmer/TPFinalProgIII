import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-result-productos',
  templateUrl: './result-product.component.html',
  styles: [
  ]
})
export class ResultProductComponent {
 

    get resultSearch() {
      return this.prodsService.allProducts;
    }

  constructor(private prodsService: ProductService) { }

}