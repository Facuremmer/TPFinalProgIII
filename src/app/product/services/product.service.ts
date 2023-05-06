import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../interfaces/product.interface";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
import { ProductCreate } from "../interfaces/productCreate.interface";

@Injectable()
export class ProductService {

    private _product: Product[] = [];
    private _record: string[] = [];

    urlProd:string = environment.apiUri + "/Productos/";

    get allProducts() {
        return [...this._product];
    }

    get record() {
        return [...this._record];
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

    SearchProductById(idprod:number): Observable<Product>{
       return this.http.get<Product>(`${this.urlProd}${idprod}`);
    }

    ClearRecord(){
        this._record;
        localStorage.clear();
        window.location.reload();
    }

    create(newProd: ProductCreate) {
        console.log('Calling WebApi');
        this.http.put(`${this.urlProd}create`, newProd)
                 .subscribe();
    }
}