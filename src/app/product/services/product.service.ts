import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

import { IdProduct } from "../interfaces/idProduct.interface";
import { Product } from "../interfaces/product.interface";
import { ProductCreate } from "../interfaces/productCreate.interface";
import { TypeProduct } from "../interfaces/typeProduct.interface";
import { TypeProductCreate } from "../interfaces/typeProductCreate.interface";

@Injectable()
export class ProductService {

    private _productId: IdProduct [] = [];
    private _product: Product[] = [];
    private _record: string[] = [];

    urlProd:string = environment.apiUri + "/Productos/";
    urlTypeProd:string = environment.apiUri + "/TipoProducto/";

    
    get allProducts() {
        return [...this._product];
    }

    get record() {
        return [...this._record];
    }

    get allProductsId() {
        return [...this._productId];
    }


    constructor (private http:HttpClient) {
        if (localStorage.getItem('record')){
            const record = localStorage.getItem('record');
            this._record = JSON.parse(record!)
        }

    }

    SearchAllProducts(){
        this.http.get<Product[]>(`${this.urlProd}All`)
            .subscribe(
                resp => {
                    this._product = resp;
                }
            );
    }

    SearchAllProductsId(){
        return this.http.get<IdProduct[]>(`${this.urlProd}AllId`);
    }

    nameProducts(){
        return this.http.get<TypeProduct[]>(`${this.urlTypeProd}All`);
    }

    SearchProductByName(argument:string){
        const params = new HttpParams().set('productName',argument); 

        this.http.get<Product[]>(`${this.urlProd}byName?`, {params})
        .subscribe(
            resp => {
                this._product = resp;
            }
        );
        if (!this._record.includes(argument)){
            this._record.push(argument);
            localStorage.setItem('record',JSON.stringify(this._record));
        }
    }

    SearchProductById(idprod:number): Observable<Product>{
       return this.http.get<Product>(`${this.urlProd}${idprod}`);
    }

    ClearRecord(){
        this._record;
        localStorage.clear();
        window.location.reload();
    }

    create(newProd: ProductCreate) {
        this.http.put(`${this.urlProd}create`, newProd)
                 .subscribe();
    }

    createTypeProd(newTypeProd: TypeProductCreate) {
        this.http.put(`${this.urlTypeProd}create`, newTypeProd)
                 .subscribe();
    }

    edit(newProd: ProductCreate){
        this.http.put(`${this.urlProd}update`, newProd)
                 .subscribe();
    }

    eliminate(id: number){
        const urlDelete = this.urlProd + id
        this.http.delete(urlDelete).subscribe();
    }
}