import { Component, OnInit }                                                        from '@angular/core';
import { ProductService }                                                           from "../product/product.service";
import { LocationService }                                                          from "../location/location.service";
import { Product }                                                                  from "../product/product";
import { Location }                                                                 from '../location/location';
import { Region }                                                                   from "../location/region";
import { CheckProductResponse }                                                     from "../response/CheckProductResponse";

@Component({
  selector: 'home-page',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomePageComponent implements OnInit {
  products: Product[] = [];
  productsStatus: CheckProductResponse[] = [];
  locations: Location[] = [];
  regions: Region[] = [];
  selectedLocation : Location = this.makeDefaultLocation("Select Location");
  searchProducts: Product[] = [];
  searchErrorMessage: any;
  errorMessage: any;
  start = 0;
  end = 100;

  constructor (private productService: ProductService, private locationService : LocationService) {}

  ngOnInit(): void {
    this.locationService.getLocations().subscribe(
      locationsResponse => {
        let newLocations : Location[] = [];
        if(locationsResponse != null){
          if(locationsResponse.data.length > 0 && locationsResponse.data != null){
            this.regions  = locationsResponse.data;
            for(let region of this.regions){
              for(let location of region.regionPos){
                newLocations.push(location)
              }
            }
          }
          this.locations = newLocations;
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
    this.getSearchProducts(searchTerm.value)
  }

  private getSearchProducts(query : string){
    this.productService.getProductsQueryForLocation(query, this.selectedLocation.name).subscribe(
      queryResponse  => {
        let products = queryResponse.products;
        let status = queryResponse.productStatus;
        if(products.length > 0 && products != null){
          this.clearSearchProduct();
          this.searchProducts = products;
        }
        if(status != null && status.length > 0){
          this.clearSearchProductStatus();
          this.productsStatus = status;
          this.populateProductStatus();
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

  private populateProductStatus() {
    for (let i = 0; i < this.productsStatus.length; i++) {
      this.searchProducts[i].status = this.productsStatus[i]
    }
  }

  /**
   * Makes the default Location.
   * @returns {Location}
   */
  makeDefaultLocation(name : string) {
    let defaultLocation = new Location();
    defaultLocation.name = name;
    return defaultLocation;
  }

  /**
   * Clears the search products.
   */
  private clearSearchProduct() {
    this.searchProducts = [];

  }
  /**
   * Clears the search status.
   */
  private clearSearchProductStatus(){
      this.productsStatus = [];
    }
}
