import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
import { SaleDetail } from "../interfaces/saleDetail.interface";
import { SaleDetailCreate } from "../interfaces/saleDetailaCreate.interface";
import { SaleDetailUpdate } from "../interfaces/saleDetailUpdate";
import { SaleDetailId } from "../interfaces/saleDetailId.interface";

@Injectable()
export class SaleDetailService {

    private _saleDetails: SaleDetail[] = [];
    private _record: string[] = [];

    urlSaleDetail: string = environment.apiUri + "/DetalleVenta/";

    get allSaleDetails() {
        return [...this._saleDetails];
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

    searchAllSaleDetails() {
        this.http.get<SaleDetail[]>(`${this.urlSaleDetail}All`)
            .subscribe(
                resp => {
                    this._saleDetails = resp;
                }
            );
    }

    SearchSaleDetailByName(argument:string){
        const params = new HttpParams().set('saleDetailName',argument); 

        this.http.get<SaleDetail[]>(`${this.urlSaleDetail}byName?`, {params})
        .subscribe(
            resp => {
                this._saleDetails = resp;
            }
        );
    }

    SearchAllId(){
        return this.http.get<SaleDetailId[]>(`${this.urlSaleDetail}AllId`)
     }

    searchSaleDetailById(idDetalleVenta: number): Observable<SaleDetail> {
        return this.http.get<SaleDetail>(`${this.urlSaleDetail}${idDetalleVenta}`);
    }

    clearRecord() {
        this._record = [];
        localStorage.clear();
        window.location.reload();
    }

    create(newSaleDetail: SaleDetailCreate) {
        this.http.put(`${this.urlSaleDetail}create`, newSaleDetail)
            .subscribe();
    }

    edit(newSaleDetail: SaleDetailUpdate) {
        this.http.put(`${this.urlSaleDetail}update`, newSaleDetail)
            .subscribe();
    }

    eliminate(id: number) {
        const urlDelete = this.urlSaleDetail + id;
        this.http.delete(urlDelete).subscribe();
    }
}
