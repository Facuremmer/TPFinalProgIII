import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';
import { switchMap} from 'rxjs/operators';
import { ProductById } from '../interfaces/productById.interface';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',

})
export class ViewProductComponent {

product: ProductById = {};

  constructor (private activateRoutes: ActivatedRoute,
               private productSevice: ProductService){}

   ngOnInit(): void {
    this.activateRoutes.params
      .pipe(
        switchMap(
          ({idprod}) => this.productSevice.SearchProductById(idprod))
        )
        .subscribe(resp => {
          this.product = resp;
        });
  }
}
