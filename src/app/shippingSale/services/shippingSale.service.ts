import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";

import { ShippingSale } from "../interfaces/shippingSale.interface";
import { ShippingSaleCreateOrUpdate } from "../interfaces/shippingSaleCreateOrUpdate.interface";


@Injectable()
export class ShippingSaleService {

    private _shippingSales: ShippingSale[] = [];
    private _record: string[] = [];

    urlShippingSale: string = environment.apiUri + "/EnvioVenta/";

    get allShippingSales() {
        return [...this._shippingSales];
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

    searchAllShippingSales() {
        this.http.get<ShippingSale[]>(`${this.urlShippingSale}All`)
            .subscribe(
                resp => {
                    this._shippingSales = resp;
                }
            );
    }

    searchShippingSaleById(idDetalleDeVenta: number): Observable<ShippingSale> {
        return this.http.get<ShippingSale>(`${this.urlShippingSale}${idDetalleDeVenta}`);
    }

    clearRecord() {
        this._record = [];
        localStorage.clear();
        window.location.reload();
    }

    create(newShippingSale: ShippingSaleCreateOrUpdate) {
        this.http.put(`${this.urlShippingSale}create`, newShippingSale)
            .subscribe();
    }

    edit(newShippingSale: ShippingSaleCreateOrUpdate) {
        this.http.put(`${this.urlShippingSale}update`, newShippingSale)
            .subscribe();
    }

    eliminate(id: number) {
        const urlDelete = this.urlShippingSale + id;
        this.http.delete(urlDelete).subscribe();
    }
}
