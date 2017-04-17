import {Component, OnInit}                                  from '@angular/core';
import {ProductService}                                     from "../product/product.service";
import {Product}                                            from "../product/product";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'home-page',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomePageComponent{// implements OnInit{
  title = 'Smyths Products';
  products: Product[] = [];
  searchProducts: Product[] = [];
  searchErrorMessage: any;
  errorMessage: any;
  start = 0;
  end = 100;

  constructor (private productService: ProductService) {}

  /**
   * Is called when the page loads.
   */
 // ngOnInit() { this.getProducts(); }

  /***
   * Returns an array of the search parameter.
   * @param searchTerm
   */
  getProductsQuery(searchTerm: HTMLInputElement){
    this.productService.getProductsQuery(searchTerm.value).subscribe(
      products  => {
        if(products.length > 0 && products != null){
            this.searchProducts = products;
        }
      },
      error =>{
        this.searchErrorMessage = error;
      });
  }

  /**
   * Gets the products between the given indexes.
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
        this.errorMessage = error
      });

  }
}
