import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";

import { PurchaseDetail } from "../interfaces/purchaseDetail.interface";
import { PurchaseDetailCreate } from "../interfaces/purchaseDetailCreate.interface";
import { PurchaseDetailId } from "../interfaces/purchaseDetailId.interface";
import { PurchaseDetailUpdate } from "../interfaces/purchaseDetailUpdate.Interface";


@Injectable()
export class PurchaseDetailService {

    private _purchaseDetails: PurchaseDetail[] = [];
    private _record: string[] = [];

    urlPurchaseDetail: string = environment.apiUri + "/DetalleCompra/";

    get allPurchaseDetails() {
        return [...this._purchaseDetails];
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

    searchAllPurchaseDetails() {
        this.http.get<PurchaseDetail[]>(`${this.urlPurchaseDetail}All`)
            .subscribe(
                resp => {
                    this._purchaseDetails = resp;
                }
            );
    }

    SearchPurchaseDetailByName(argument:string){
        const params = new HttpParams().set('purchaseDetailName',argument); 

        this.http.get<PurchaseDetail[]>(`${this.urlPurchaseDetail}byName?`, {params})
        .subscribe(
            resp => {
                this._purchaseDetails = resp;
            }
        );
    }

    SearchAllId(){
        return this.http.get<PurchaseDetailId[]>(`${this.urlPurchaseDetail}AllId`)
     }
    searchPurchaseDetailByPurchaseId(purchaseId: number) {
        const params = new HttpParams().set('purchaseId', purchaseId.toString());

        this.http.get<PurchaseDetail[]>(`${this.urlPurchaseDetail}byPurchaseId?`, { params })
            .subscribe(
                resp => {
                    this._purchaseDetails = resp;
                }
            );
        if (!this._record.includes(purchaseId.toString())) {
            this._record.push(purchaseId.toString());
            localStorage.setItem('record', JSON.stringify(this._record));
        }
    }

    searchPurchaseDetailById(idPurchaseDetail: number): Observable<PurchaseDetail> {
        return this.http.get<PurchaseDetail>(`${this.urlPurchaseDetail}${idPurchaseDetail}`);
    }

    clearRecord() {
        this._record = [];
        localStorage.clear();
        window.location.reload();
    }

    create(newPurchaseDetail: PurchaseDetailCreate) {
        this.http.put(`${this.urlPurchaseDetail}create`, newPurchaseDetail)
            .subscribe();
    }

    edit(newPurchaseDetail: PurchaseDetailUpdate) {
        this.http.put(`${this.urlPurchaseDetail}update`, newPurchaseDetail)
            .subscribe();
    }

    eliminate(id: number) {
        const urlDelete = this.urlPurchaseDetail + id;
        this.http.delete(urlDelete).subscribe();
    }
}
