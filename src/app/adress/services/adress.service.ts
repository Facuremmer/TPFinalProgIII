import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
import { Adress } from "../interfaces/adress.interface";
import { AdressUpdate } from "../interfaces/adressUpdate.interface";
import { AdressCreate } from "../interfaces/adressCreate.interface";
import { AdressId } from "../interfaces/adressId.interface";


@Injectable()
export class AdressService {

    private _adress: Adress[] = [];
    private _record: string[] = [];

    urlDirec:string = environment.apiUri + "/Dirección/";

    get allAdress() {
        return [...this._adress];
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

    SearchAllAdress(){
        this.http.get<Adress[]>(`${this.urlDirec}All`)
            .subscribe(
                resp => {
                    this._adress = resp;
                }
            );
    }

    SearchAllId(){
        return this.http.get<AdressId[]>(`${this.urlDirec}AllId`)
     }

    SearchAdressByStreet(argument:string){
        const params = new HttpParams().set('adressName',argument); 

        this.http.get<Adress[]>(`${this.urlDirec}byName?`, {params})
        .subscribe(
            resp => {
                this._adress = resp;
            }
        );
        if (!this._record.includes(argument)){
            this._record.push(argument);
            localStorage.setItem('record',JSON.stringify(this._record));
        }
    }

    SearchAdresstById(idAdr:number): Observable<Adress>{
       return this.http.get<Adress>(`${this.urlDirec}${idAdr}`);
    }

    ClearRecord(){
        this._record;
        localStorage.clear();
        window.location.reload();
    }

    create(newProd: AdressCreate) {
        this.http.put(`${this.urlDirec}create`, newProd)
                 .subscribe();
    }

    edit(newProd: AdressUpdate){
        this.http.put(`${this.urlDirec}update`, newProd)
                 .subscribe();
    }

    eliminate(id: number){
        const urlDelete = this.urlDirec + id
        this.http.delete(urlDelete).subscribe();
    }
}