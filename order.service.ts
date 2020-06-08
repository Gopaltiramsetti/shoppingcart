import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {



  cart = [];

  noProductsSelected:boolean=false;

  tmpCart = [];
  lessThanOneQuantity:boolean=false;

  orders = [];

  constructor() { }

 

  getOrders() {
    return localStorage.getItem('orders');
  }

 placeOrder() {


  this.noProductsSelected = false;
    let order = { date: new Date(), product: JSON.parse(localStorage.getItem('cart'))};
    console.log(order);
    if(order.product.length < 1)
    {
      this.noProductsSelected = true;
       alert('There is no products selected');
    }else{
    if(localStorage.getItem('orders') != null) {
      this.orders = JSON.parse(localStorage.getItem('orders'));
    }
    else {
      this.orders = [];
    }
    this.orders.push(order);
    localStorage.setItem('orders', JSON.stringify(this.orders));

    alert('Order placed successfully.');

    localStorage.setItem('cart', JSON.stringify([]));
    }
  }

}
