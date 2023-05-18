import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
import { Provider } from "../interfaces/provider.interface";
import { ProviderCreate } from "../interfaces/providerCreate.interface";
import { ProviderUpdate } from "../interfaces/providerUpdate.interface";
import { ProviderId } from "../interfaces/providerId.interface";



@Injectable()
export class ProviderService {

    private _provider: Provider[] = [];
    private _record: string[] = [];

    urlProv:string = environment.apiUri + "/Proveedor/";

    get allProvider() {
        return [...this._provider];
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

    SearchAllProvider(){
        this.http.get<Provider[]>(`${this.urlProv}All`)
            .subscribe(
                resp => {
                    this._provider= resp;
                }
            );
    }

    SearchAllId(){
        return this.http.get<ProviderId[]>(`${this.urlProv}AllId`)
     }

    SearchProviderByName(argument:string){
        const params = new HttpParams().set('providerName',argument); 

        this.http.get<Provider[]>(`${this.urlProv}byName?`, {params})
        .subscribe(
            resp => {
                this._provider = resp;
            }
        );
        if (!this._record.includes(argument)){
            this._record.push(argument);
            localStorage.setItem('record',JSON.stringify(this._record));
        }
    }

    SearchProviderById(idprov:number): Observable<Provider>{
       return this.http.get<Provider>(`${this.urlProv}${idprov}`);
    }

    ClearRecord(){
        this._record;
        localStorage.clear();
        window.location.reload();
    }

    create(newProd: ProviderCreate) {
        this.http.put(`${this.urlProv}create`, newProd)
                 .subscribe();
    }

    edit(newProd: ProviderUpdate){
        this.http.put(`${this.urlProv}update`, newProd)
                 .subscribe();
    }

    eliminate(id: number){
        const urlDelete = this.urlProv + id
        this.http.delete(urlDelete).subscribe();
    }
}