import {CartDTO} from "./cartdto";

export class CartDetailDTO {
  id: number;
  quantity: number;
  product_id: string;
  cart: CartDTO = new CartDTO();
}
