import { OrderDTO } from './orderdto';
export class OrderDetailDTO {
  id: number;
  quantity: number;
  unitPrice: number;
  product_id: string;
  order: OrderDTO = new OrderDTO();
}
