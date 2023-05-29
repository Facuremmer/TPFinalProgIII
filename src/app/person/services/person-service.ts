import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";

import { Person } from "../interfaces/person.interface";



@Injectable()
export class PersonService {

    private _person: Person[] = [];
    private _record: string[] = [];

    urlPers:string = environment.apiUri + "/Persona/";
    
    get allPersons() {
        return [...this._person];
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

    SearchAllPerson(){
        this.http.get<Person[]>(`${this.urlPers}All`)
            .subscribe(
                resp => {
                    this._person = resp;
                }
            );
    }

    SearchAllDNI(){
       return this.http.get<Person[]>(`${this.urlPers}AllDni`)
    }

    SearchPersonByName(argument:string){
        const params = new HttpParams().set('personName',argument); 

        this.http.get<Person[]>(`${this.urlPers}byName?`, {params})
        .subscribe(
            resp => {
                this._person = resp;
            }
        );
        if (!this._record.includes(argument)){
            this._record.push(argument);
            localStorage.setItem('record',JSON.stringify(this._record));
        }
    }

    SearchPersonByDNI(idpersn:number): Observable<Person>{
       return this.http.get<Person>(`${this.urlPers}${idpersn}`);
    }

    ClearRecord(){
        this._record;
        localStorage.clear();
        window.location.reload();
    }

    create(newPersn: Person) {
        this.http.put(`${this.urlPers}create`, newPersn)
                 .subscribe();
    }

    edit(newPersn: Person){
        this.http.put(`${this.urlPers}update`, newPersn)
                 .subscribe();
    }

    eliminate(id: number){
        const urlDelete = this.urlPers + id
        this.http.delete(urlDelete).subscribe();
    } 
} 