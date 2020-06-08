import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productList = [
    { id: 1, name: 'Notebooks', price: 40, description: 'A4 notebook', rating: 4.9, quantity: 1 },
    { id: 2, name: 'Pizza', price: 450, description: 'Italian food', rating: 4.4, quantity: 1 },
    { id: 3, name: 'Mouse', price: 799, description: 'Wireless mouse', rating: 3.7, quantity: 1 },
    { id: 4, name: 'Car', price: 900000, description: 'Electic car', rating: 4.1, quantity: 1 },
    { id: 5, name: 'Tyre', price: 3000, description: 'Nylon tyre', rating: 3.5, quantity: 1 },
  ];

  cart = [];

  noProductsSelected:boolean=false;

  tmpCart = [];
  lessThanOneQuantity:boolean=false;

  orders = [];

  constructor() { }

  getProducts() {
    return this.productList;
  }

  getCart() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  addToCart(product) {
    console.log('Product Service: addToCart()');
    if(localStorage.getItem('cart') != null) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
    else {
      this.cart = [];
    }
    let productFoundInCart: boolean = false;
    for(var i = 0; i < this.cart.length; i++) {
      if(this.cart[i].id == product.id) {
        var newQuantity = this.cart[i].quantity + 1;
        this.cart[i].quantity = newQuantity;
        productFoundInCart = true;
        break;
      }
    }
    if(!productFoundInCart) {
      this.cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(this.cart));
    console.log(this.cart);
  }

  removeFromCart(product) {
    this.tmpCart = [];
    this.lessThanOneQuantity = false;
    console.log('Product Service: removeFromCart()');
    if(localStorage.getItem('cart') != null) {
      this.cart = JSON.parse(localStorage.getItem('cart'));
    }
    else {
      this.cart = [];
    }
    let productFoundInCart: boolean = false;
    for(var i = 0; i < this.cart.length; i++) {
      if(this.cart[i].id == product.id && this.cart[i].quantity > 1) {
        var newQuantity = this.cart[i].quantity - 1;
        this.cart[i].quantity = newQuantity;
        productFoundInCart = true;
        break;
      }else{
         this.lessThanOneQuantity = true;
          for(var i = 0; i < this.cart.length; i++) {
          if(this.cart[i].id != product.id ) {
            this.tmpCart.push(this.cart[i]);
          }
        }
        
      }
    }
    
if(this.lessThanOneQuantity){
  localStorage.setItem('cart', JSON.stringify(this.tmpCart));
}else{
  localStorage.setItem('cart', JSON.stringify(this.cart));
}
     
    console.log(this.cart);
  }

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
