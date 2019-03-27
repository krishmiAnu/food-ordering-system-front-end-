import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MainUrlService} from './main-url.service';
import {Observable} from 'rxjs';
import {OrderDTO} from '../dto/orderdto';

const ORDERS_URL = '/api/v1/orders';

@Injectable()
export class OrderService {

  constructor(private http: HttpClient, private mainUrl: MainUrlService) {
  }

  svaeOrder(order: OrderDTO): Observable<boolean> {
    return this.http.post<boolean>(this.mainUrl.MAIN_URL + ORDERS_URL, order);
  }

  getAllOrders(): Observable<Array<OrderDTO>> {
    return this.http.get<Array<OrderDTO>>(this.mainUrl.MAIN_URL + ORDERS_URL);
  }

  deleteOrder(code: string): Observable<boolean> {
    return this.http.delete<boolean>(this.mainUrl.MAIN_URL + ORDERS_URL + '/' + code);
  }

  get AllOrdersCount(): Observable<number> {
    return this.http.get<number>(this.mainUrl.MAIN_URL + ORDERS_URL + '/count');
  }
}
