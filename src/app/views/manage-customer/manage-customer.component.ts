import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {CustomerDTO} from "../../dto/customerdto";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.css']
})
export class ManageCustomerComponent implements OnInit {

  curruntCustomer: CustomerDTO = new CustomerDTO();
  customerList: Array<CustomerDTO> = [];
  isCustomerSelected = false;
  @ViewChild('formCustomer')
  formCustomer: NgForm;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.loadAllCustomers();
  }

  loadAllCustomers(): void {
    this.customerService.getAllCustomers()
      .subscribe((result) => {
        this.customerList = result;
      });
  }

  saveCustomer(): void {
    this.customerService.saveCustomer(this.curruntCustomer)
      .subscribe((result) => {
        if (result) {
          alert('Customer has been saved successfully');
          this.loadAllCustomers();
          this.clear();
        } else {
          alert('Failed to save the Customer');
        }
      });
  }

  deleteCustomer(customer: CustomerDTO): void {
    this.customerService.deleteCustomer(customer.cust_id)
      .subscribe((result) => {
        if (result) {
          this.loadAllCustomers();
          this.clear();
          alert('Customer has been deleted successfully');
        } else {
          alert('Failed to delete the Customer');
        }
      });
  }

  selectCustomer(customer: CustomerDTO): void {
    this.curruntCustomer = customer;
    this.isCustomerSelected = true;
  }

  clear(): void {
    this.curruntCustomer = new CustomerDTO();
    this.isCustomerSelected = false;
  }
}
