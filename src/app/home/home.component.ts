import {Component, OnInit}                                  from '@angular/core';
import {ProductService}                                     from "../product/product.service";
import {Product}                                            from "../product/product";

@Component({
  selector: 'home-page',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomePageComponent{// implements OnInit{
  title = 'Smyths Products';
  products: Product[] = [];
  errorMessage: any;
  start = 0;
  end = 100;

  constructor (private productService: ProductService) {}

  /**
   *
   */
 // ngOnInit() { this.getProducts(); }

  /**
   *
   */
  getProducts() {
    this.productService.getProducts(this.start, this.end).subscribe(
      products => {
        if(products.length > 0 && products != null){
          this.start = this.end + 1;
          this.end = this.end + 100;
          this.products = this.products.concat(products);
        }
      },
      error => {
        this.errorMessage = <any>error
      });

  }

  updateProducts (newProducts){

  }
}

