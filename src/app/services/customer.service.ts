import { CustomerDTO } from '../dto/customerdto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import {MainUrlService} from './main-url.service';

const CUSTOMER_URL = '/api/v1/customers';

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient, private mainUrl: MainUrlService) { }

  saveCustomer(customer: CustomerDTO): Observable<boolean> {
    return this.http.post<boolean>(this.mainUrl.MAIN_URL + CUSTOMER_URL, customer);
  }

  getAllCustomers(): Observable<Array<CustomerDTO>> {
    return this.http.get<Array<CustomerDTO>>(this.mainUrl.MAIN_URL + CUSTOMER_URL);
  }

  deleteCustomer(id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.mainUrl.MAIN_URL + CUSTOMER_URL + '/' + id);
  }

  get AllCustomerCount(): Observable<number> {
    return this.http.get<number>(this.mainUrl.MAIN_URL + CUSTOMER_URL + '/count');
  }
}
