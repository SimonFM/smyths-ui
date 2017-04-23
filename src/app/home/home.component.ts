import { Component, OnInit }                                                        from '@angular/core';
import { ProductService }                                                           from "../product/product.service";
import { LocationService }                                                          from "../location/location.service";
import { Product }                                                                  from "../product/product";
import { Location }                                                                 from '../location/location';

@Component({
  selector: 'home-page',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomePageComponent implements OnInit {
  products: Product[] = [];
  locations: Location[] = [];
  selectedLocation : Location;
  searchProducts: Product[] = [];
  searchErrorMessage: any;
  errorMessage: any;
  start = 0;
  end = 100;

  constructor (private productService: ProductService, private locationService : LocationService) {}

  ngOnInit(): void {
    this.locationService.getLocations().subscribe(
      allLocations => {
        if(allLocations.length > 0 && allLocations != null){
          this.locations = allLocations;
        }
      } ,
      error => {
        this.errorMessage = error
      }
    );
  }

  /**
   *
   */
  setSelectedLocation(newLocation : Location){
    this.selectedLocation = newLocation;
    let name = newLocation.name;
    console.log("selected location: " + name)
  }

  /***
   * Returns an array of the search parameter.
   * @param searchTerm
   */
  getProductsQuery(searchTerm: HTMLInputElement){
    this.productService.getProductsQuery(searchTerm.value).subscribe(
      products  => {
        if(products.length > 0 && products != null){
          this.clearSearchProduct();
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
  getAllProducts() {
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

  private clearSearchProduct() {
    this.searchProducts = [];
  }
}
