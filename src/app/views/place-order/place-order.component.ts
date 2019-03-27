import {Component, OnInit, ViewChild} from '@angular/core';
import {CustomerDTO} from "../../dto/customerdto";
import {ProductDTO} from "../../dto/productdto";
import {OrderDetailDTO} from "../../dto/orderdetaildto";
import {OrderDTO} from "../../dto/orderdto";
import {NgForm} from "@angular/forms";
import {OrderService} from "../../services/order.service";
import {ProductService} from "../../services/products.service";
import {CustomerService} from "../../services/customer.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  customerList: Array<CustomerDTO> = [];
  productList: Array<ProductDTO> = [];

  order: OrderDTO = new OrderDTO();
  customer: CustomerDTO = new CustomerDTO();
  product: ProductDTO = new ProductDTO();
  orderDetail: OrderDetailDTO = new OrderDetailDTO();
  orderDetailList: Array<OrderDetailDTO> = [];
  date: string;
  totalAmount: number = 0;
  @ViewChild('formPlaceOrder')
  formPlaceOrder: NgForm;

  constructor(private orderService: OrderService, private productService: ProductService, private customerService: CustomerService, private datepipe: DatePipe) { }

  ngOnInit() {
    this.loadAllCustomers();
    this.loadAllItems();
    if (this.customerList.length > 0) {
      this.customer.cust_id = this.customerList[0].cust_id;
    }
    if (this.productList.length > 0 ) {
      this.product.product_id = this.productList[0].product_id;
      this.itemChange();
    }
    this.date = this.datepipe.transform(new Date(), 'yyyy-MM-d');
  }

  loadAllCustomers(): void {
    this.customerService.getAllCustomers()
      .subscribe((result) => {
        this.customerList = result;
      });
  }

  loadAllItems(): void {
    this.productService.getAllProducts()
      .subscribe((result) => {
        this.productList = result;
      });
  }

  itemChange(): void {
    L1: for (const product of this.productList) {
      if (this.product.product_id === this.product.product_id) {
        this.product = {product_id: product.product_id, product_name: product.product_name, description: product.description, product_image: product.product_image,quantity: product.quantity, unitPrice: product.unitPrice, categorieDTO: product.categorieDTO};
        this.orderDetail.product_id = product.product_id;
        this.orderDetail.unitPrice = product.unitPrice;
        for (const orderDetail of this.orderDetailList) {
          if (orderDetail.product_id === product.product_id) {
            this.orderDetail.quantity = orderDetail.quantity;
            this.orderDetail.unitPrice = orderDetail.unitPrice;
            this.product.quantity = +this.product.quantity - +orderDetail.quantity;
            break L1;
          }
        }
        this.orderDetail.quantity = 0;
        break;
      }
    }
  }

  addOrderDetail(): void {
    if (this.orderDetail.quantity > 0) {
      if (this.orderDetail.quantity <= this.product.quantity) {
        for (const orderDetail of this.orderDetailList) {
          if (orderDetail.product_id === this.orderDetail.product_id) {
            this.orderDetailList.splice(this.orderDetailList.indexOf(orderDetail), 1);
            this.totalAmount -= (orderDetail.unitPrice * orderDetail.quantity);
          }
        }
        this.orderDetailList.push({
          id: 0,
          quantity: this.orderDetail.quantity,
          unitPrice: this.orderDetail.unitPrice,
          product_id: this.product.product_id,
          // order: {id: 0, , order_date: this.order.order_date, customer: this.order.customer, orderDetail: null}
          order: {id: 0, date: this.order.date, customer: this.order.customer, orderDetail: null}
        });
        for (const item of this.productList) {
          if (this.orderDetail.product_id === this.product.product_id) {
            this.product.quantity = +this.product.quantity - +this.orderDetail.quantity;
          }
        }
        this.totalAmount += (this.orderDetail.unitPrice * this.orderDetail.quantity);
      } else {
        alert('ented qntity is more than qtyOnHand');
      }
    }
  }

  removeOrderDetail(orderDetail: OrderDetailDTO): void {
    for (const orderDetails of this.orderDetailList) {
      if (orderDetail.product_id === orderDetails.product_id) {
        this.orderDetailList.splice(this.orderDetailList.indexOf(orderDetail), 1);
        this.totalAmount -= (orderDetail.unitPrice * orderDetail.quantity);
      }
    }
    if (this.product.product_id === orderDetail.product_id) {
      this.product.quantity = +this.product.quantity + +orderDetail.quantity;
    }
  }

  placeOrder(): void {
    this.order.date = new Date();
    this.order.customer = this.customer;
    this.order.orderDetail = this.orderDetailList;
    this.orderService.svaeOrder(this.order)
      .subscribe((result) => {
        if (result) {
          alert ('success');
        } else {
          alert ('faild');
        }
      });
    this.orderDetailList = [];
  }

  getItemDescription(product_id: string): string {
    for (const product of this.productList) {
      if (product.product_id === product_id) {
        return product.product_name;
      }
    }
  }

}
