import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',

})
export class ViewProductComponent {

  constructor (private activateRoutes: ActivatedRoute){}

  ngOnInit():void{
    this.activateRoutes.params.subscribe(
      resp => {
        console.log(resp)
      }
    )
  }
}
