import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
import { Purchase } from "../interfaces/purchase.interface";
import { PurchaseCreate } from "../interfaces/purchaseCreate.interface";
import { PurchaseUpdate } from "../interfaces/purchaseUpdate.interface";
import { PurchaseId } from "../interfaces/purchaseId.interface";

@Injectable()
export class PurchaseService {

    private _purchases: Purchase[] = [];
    private _record: string[] = [];

    urlPurchase: string = environment.apiUri + "/Compra/";

    get allPurchases() {
        return [...this._purchases];
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

    searchAllPurchases() {
        this.http.get<Purchase[]>(`${this.urlPurchase}All`)
            .subscribe(
                resp => {
                    this._purchases = resp;
                }
            );
    }

    SearchPurchaseByItem(argument:string){
        const params = new HttpParams().set('purchaseName',argument); 

        this.http.get<Purchase[]>(`${this.urlPurchase}byName?`, {params})
        .subscribe(
            resp => {
                this._purchases = resp;
            }
        );
    }

    SearchAllId(){
        return this.http.get<PurchaseId[]>(`${this.urlPurchase}AllId`)
     }

    searchPurchaseByCode(argument: string) {
        const params = new HttpParams().set('purchaseCode', argument);

        this.http.get<Purchase[]>(`${this.urlPurchase}byCode?`, { params })
            .subscribe(
                resp => {
                    this._purchases = resp;
                }
            );
        if (!this._record.includes(argument)) {
            this._record.push(argument);
            localStorage.setItem('record', JSON.stringify(this._record));
        }
    }

    searchPurchaseById(idPurchase: number): Observable<Purchase> {
        return this.http.get<Purchase>(`${this.urlPurchase}${idPurchase}`);
    }

    clearRecord() {
        this._record = [];
        localStorage.clear();
        window.location.reload();
    }

    create(newPurchase: PurchaseCreate) {
        this.http.put(`${this.urlPurchase}create`, newPurchase)
            .subscribe();
    }

    edit(newPurchase: PurchaseUpdate) {
        this.http.put(`${this.urlPurchase}update`, newPurchase)
            .subscribe();
    }

    eliminate(id: number) {
        const urlDelete = this.urlPurchase + id;
        this.http.delete(urlDelete).subscribe();
    }
}
