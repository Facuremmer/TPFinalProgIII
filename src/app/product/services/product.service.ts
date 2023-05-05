import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product.interface";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
import { ProductById } from "../interfaces/productById.interface";

@Injectable()
export class ProductService {

    private _product: Product[] = [];
    private _record: string[] = [];
    private _oneProduct: ProductById = {};

    urlProd:string = environment.apiUri + "/Productos/";

    get allProducts() {
        return [...this._product];
    }

    get record() {
        return [...this._record];
    }

    get oneProduct() {
        return this._oneProduct;
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

    SearchProductById(idprod:number): Observable<ProductById>{
       return this.http.get<ProductById>(`${this.urlProd}${idprod}`);
    }

    ClearRecord(){
        this._record;
        localStorage.clear();
        window.location.reload();
    }
}