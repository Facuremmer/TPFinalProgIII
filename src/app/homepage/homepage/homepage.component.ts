import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  images = [
    { path: 'assets/img/Imagen1.jpg', alt: 'Imagen 1' },
    { path: 'assets/img/Imagen2.jpg', alt: 'Imagen 2' },
    { path: 'assets/img/Imagen3.jpg', alt: 'Imagen 3' },
  ];

  constructor(private router: Router) {}

  goCreateClient(): void{
    this.router.navigate(['Clientes/agregar'])
  }

  goCreateProvider(): void{
    this.router.navigate(['Proveedor/agregar'])
  }

  goCreatePurchase(): void{
    this.router.navigate(['Compra/agregar'])
  }

  goCreateSale(): void{
    this.router.navigate(['Ventas/agregar'])
  }

  goCreatePerson(): void{
    this.router.navigate(['persona/agregar'])
  }

}
