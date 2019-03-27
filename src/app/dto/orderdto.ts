import { CustomerDTO } from './customerdto';
import { OrderDetailDTO } from './orderdetaildto';

export class OrderDTO {
  id: number;
  // delivery_add_id: string;
  // payment_method: string;
  // total_quantity: number;
  // total_price: number;
  date: Date;
  customer: CustomerDTO = new CustomerDTO();
  orderDetail: Array<OrderDetailDTO>;
}
