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
  selectedLocation : Location = this.makeDefaultLocation("Select Location");
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
   * Sets the selected location to be the one in the drop down.
   * @param newLocation - The location to update the selected Location to be
   */
  setSelectedLocation(newLocation : Location){
    this.selectedLocation = newLocation;
    let name = newLocation.name;
    console.log("selected location: " + name)
  }

  /**
   * Returns the selected location or the default location.
   */
  getSelectedLocation() : Location {
    let defaultLocation = this.makeDefaultLocation("Select Location");
    let hasSelectedLocation : boolean = this.selectedLocation != null;
    return (hasSelectedLocation)? this.selectedLocation : defaultLocation;
  }


  /***
   * Returns an array of the search parameter.
   * @param searchTerm - String to search for.
   */
  getProductsQuery(searchTerm: HTMLInputElement){
    if(this.selectedLocation.smythsId > 0 ){

    } else {
      this.getSearchProducts(searchTerm.value)
    }
  }

  private getSearchProducts(query : string){
    this.productService.getProductsQuery(query).subscribe(
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

  resetLocation(){
    this.selectedLocation = this.makeDefaultLocation("None")
  }

  /**
   * Makes the default Location.
   * @returns {Location}
   */
  makeDefaultLocation(name : string) {
    let defaultLocation = new Location();
    defaultLocation.name = name;
    defaultLocation.id = "";
    defaultLocation.smythsId = -1;
    return defaultLocation;
  }

  /**
   * Clears the search products.
   */
  private clearSearchProduct() {
    this.searchProducts = [];
  }
}
