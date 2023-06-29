import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

import { Sale } from '../interfaces/sale.interface';
import { SaleCreate } from '../interfaces/saleCreate.interface';
import { SaleId } from '../interfaces/saleId.interface';
import { SaleUpdate } from '../interfaces/saleUpdate.interface';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':'application/json'
    })
};
@Injectable()
export class SaleService {

    private _sales: Sale[] = [];
    private _record: string[] = [];

    urlSale: string = environment.apiUri + "/Ventas/";

    get allSales() {
        return [...this._sales];
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

    searchAllSales() {
        this.http.get<Sale[]>(`${this.urlSale}All`)
            .subscribe(
                resp => {
                    this._sales = resp;
                }
            );
    }

    SearchSaleByBranch(argument:string){
        const params = new HttpParams().set('saleName',argument); 

        this.http.get<Sale[]>(`${this.urlSale}byName?`, {params})
        .subscribe(
            resp => {
                this._sales = resp;
            }
        );
        if (!this._record.includes(argument)){
            this._record.push(argument);
            localStorage.setItem('record',JSON.stringify(this._record));
        }
    }

    SearchAllId(){
        return this.http.get<SaleId[]>(`${this.urlSale}AllId`)
     }

    searchSaleById(saleId: number): Observable<Sale> {
        return this.http.get<Sale>(`${this.urlSale}${saleId}`);
    }

    clearRecord() {
        this._record = [];
        localStorage.clear();
        window.location.reload();
    }

     create(newSale: SaleCreate): Observable<Response> {
        return this.http.post<Response>(`${this.urlSale}create`, newSale, httpOptions);
    }

    openCreate(){
        console.log("algo")
    }

    edit(newSale: SaleUpdate) {
        this.http.put(`${this.urlSale}update`, newSale)
            .subscribe();
    }

    eliminate(id: number) {
        const urlDelete = this.urlSale + id;
        this.http.delete(urlDelete).subscribe();
    }
}
