import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";

import { ShippingPurchase } from "../interfaces/shippingPurchase.interface";
import { ShippingPurchaseCreateOrUpdate } from "../interfaces/shippingPurchaseCreateOrUpdate.interface";


@Injectable()
export class ShippingPurchaseService {

    private _shippingPurchases: ShippingPurchase[] = [];
    private _record: string[] = [];

    urlShippingPurchase: string = environment.apiUri + "/EnvioCompra/";

    get allShippingPurchases() {
        return [...this._shippingPurchases];
    }

    get record() {
        return [...this._record];
    }

    constructor(private http: HttpClient) {
        if (localStorage.getItem('record')) {
            const record = localStorage.getItem('record');
            this._record = JSON.parse(record!);
        }
    }

    searchAllShippingPurchases() {
        this.http.get<ShippingPurchase[]>(`${this.urlShippingPurchase}All`)
            .subscribe(
                resp => {
                    this._shippingPurchases = resp;
                }
            );
    }

  /*   SearchShippingById(id: number) {
        const url = `${this.urlShippingPurchase}${id}`;
      
        this.http.get<ShippingPurchase[]>(url)
          .subscribe(
            resp => {
              this._shippingPurchases = resp;
            }
          );
      } */

   /*    SearchShippingById(id: number) {
        const url = `${this.urlShippingPurchase}${id}`;
      
        this.http.get<{ data: ShippingPurchase[] }>(url)
          .subscribe(
            resp => {
              this._shippingPurchases = resp.data;
            }
          );
      }
       */
      
      

    searchShippingPurchaseById(idShippingPurchase: number): Observable<ShippingPurchase> {
        return this.http.get<ShippingPurchase>(`${this.urlShippingPurchase}${idShippingPurchase}`);
    }

    clearRecord() {
        this._record = [];
        localStorage.clear();
        window.location.reload();
    }

    create(newShippingPurchase: ShippingPurchaseCreateOrUpdate) {
        this.http.put(`${this.urlShippingPurchase}create`, newShippingPurchase)
            .subscribe();
    }

    edit(newShippingPurchase: ShippingPurchaseCreateOrUpdate) {
        this.http.put(`${this.urlShippingPurchase}update`, newShippingPurchase)
            .subscribe();
    }

    eliminate(id: number) {
        const urlDelete = this.urlShippingPurchase + id;
        this.http.delete(urlDelete).subscribe();
    }
}
