import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MainUrlService} from './main-url.service';
import {Observable} from 'rxjs';
import {CartDTO} from "../dto/cartdto";

const CARTS_URL = '/api/v1/carts';

@Injectable()
export class CartService {

  constructor(private http: HttpClient, private mainUrl: MainUrlService) {
  }

  saveCart(cart: CartDTO): Observable<boolean> {
    return this.http.post<boolean>(this.mainUrl.MAIN_URL + CARTS_URL, cart);
  }

  getAllCarts(): Observable<Array<CartDTO>> {
    return this.http.get<Array<CartDTO>>(this.mainUrl.MAIN_URL + CARTS_URL);
  }

  deleteCart(code: string): Observable<boolean> {
    return this.http.delete<boolean>(this.mainUrl.MAIN_URL + CARTS_URL + '/' + code);
  }

  get AllCartsCount(): Observable<number> {
    return this.http.get<number>(this.mainUrl.MAIN_URL + CARTS_URL + '/count');
  }
}
