import {CustomerDTO} from "./customerdto";
import {CartDetailDTO} from "./cartdetaildto";

export class CartDTO{
  id: number;
  date: Date;
  customer: CustomerDTO = new CustomerDTO();
  cartDetail: Array<CartDetailDTO>;
}
