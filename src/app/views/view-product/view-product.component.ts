import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../services/products.service";
import {NgForm} from "@angular/forms";
import {ProductDTO} from "../../dto/productdto";
import {CategorieDTO} from "../../dto/categoriedto";
import {CustomerDTO} from "../../dto/customerdto";
import {CustomerService} from "../../services/customer.service";
import {CartDTO} from "../../dto/cartdto";
import {CartService} from "../../services/cart.service";
import {CartDetailDTO} from "../../dto/cartdetaildto";

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  curruntProduct: ProductDTO = new ProductDTO();
  productList: Array<ProductDTO> = [];
  customerList: Array<CustomerDTO> = [];
  customer:CustomerDTO = new CustomerDTO();
  cartDetail: CartDetailDTO = new CartDetailDTO();
  cartDetailList: Array<CartDetailDTO> = [];
  cart:CartDTO = new CartDTO();
  isProductSelected = false;
  @ViewChild('formProduct')
  formProduct: NgForm;
  constructor(private productService: ProductService, private customerService: CustomerService, private cartService: CartService) {

  }

  ngOnInit() {
    this.loadAllProducts();
    this.loadAllCustomers();
    if(this.customerList.length > 0){
      this.customer.cust_id = this.customerList[0].cust_id;
    }
  }
  loadAllProducts(): void {
    this.productService.getAllProducts()
      .subscribe((result) => {
        this.productList = result;
      });
  }
  loadAllCustomers(): void {
    this.customerService.getAllCustomers()
      .subscribe((result) => {
        this.customerList = result;
      });
  }
  addCartDetail(): void {
    if (this.cartDetail.quantity > 0) {
      if (this.cartDetail.quantity <= this.curruntProduct.quantity) {
        for (const cartDetail of this.cartDetailList) {
          if (cartDetail.product_id === this.cartDetail.product_id) {
            this.cartDetailList.splice(this.cartDetailList.indexOf(cartDetail), 1);
          }
        }
        this.cartDetailList.push({
          id: 0,
          quantity: this.cartDetail.quantity,
          product_id: this.curruntProduct.product_id,
          cart: {id: 0, date: this.cart.date, customer: this.cart.customer, cartDetail: null}

        });
        for (const product of this.productList) {
          if (this.cartDetail.product_id === product.product_id) {
            this.curruntProduct.quantity = +product.quantity - +this.cartDetail.quantity;
          }
        }
      } else {
        alert('ented qntity is more than qtyOnHand');
      }
    }
  }
  saveCart(): void {
    this.cart.date = new Date();
    this.cart.customer = this.customer;
    this.cart.cartDetail = this.cartDetailList;
    this.cartService.saveCart(this.cart)
      .subscribe((result) => {
        if (result) {
          alert ('success');
        } else {
          alert ('faild');
        }
      });
    this.cartDetailList = [];
  }
  selectProduct(product: ProductDTO): void {
    this.curruntProduct = product;
    this.isProductSelected = true;
  }
   openForm(){
    document.getElementById("myForm").style.display = "block";
  }

   closeForm(){
    document.getElementById("myForm").style.display = "none";
  }
}
