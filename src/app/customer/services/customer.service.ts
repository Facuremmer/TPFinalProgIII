import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Customer } from "../interfaces/customer.interface";
import { CustomerUpdate } from "../interfaces/customerUpdate.interface";
import { CustomerCreate } from "../interfaces/customerCreate.interface";

@Injectable()
export class CustomerService {

    private _customers: Customer[] = [];
    private _record: string[] = [];

    urlCustomer: string = environment.apiUri + "/Clientes/";

    get allCustomers() {
        return [...this._customers];
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

    searchAllCustomers() {
        this.http.get<Customer[]>(`${this.urlCustomer}All`)
            .subscribe(
                resp => {
                    this._customers = resp;
                }
            );
    }

    SearchCustomerByName(argument:string){
        const params = new HttpParams().set('customerName',argument); 

        this.http.get<Customer[]>(`${this.urlCustomer}byName?`, {params})
        .subscribe(
            resp => {
                this._customers = resp;
            }
        );
        if (!this._record.includes(argument)){
            this._record.push(argument);
            localStorage.setItem('record',JSON.stringify(this._record));
        }
    }

    SearchAllId(){
        return this.http.get<CustomerUpdate[]>(`${this.urlCustomer}AllId`)
     }

    searchCustomerById(customerId: number): Observable<Customer> {
        return this.http.get<Customer>(`${this.urlCustomer}${customerId}`);
    }

    clearRecord() {
        this._record = [];
        localStorage.clear();
        window.location.reload();
    }

    create(newCustomer: CustomerCreate) {
        this.http.put(`${this.urlCustomer}create`, newCustomer)
            .subscribe();
    }

    edit(newCustomer: CustomerUpdate) {
        this.http.put(`${this.urlCustomer}update`, newCustomer)
            .subscribe();
    }

    eliminate(id: number) {
        const urlDelete = this.urlCustomer + id;
        this.http.delete(urlDelete).subscribe();
    }
}
