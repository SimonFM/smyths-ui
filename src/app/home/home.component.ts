import { Component, OnInit }                                                        from '@angular/core';
import { ProductService }                                                           from "../product/product.service";
import { LocationService }                                                          from "../location/location.service";
import { HistoryService }                                                           from "../history/history.service";
import { Product }                                                                  from "../product/product";
import { Location }                                                                 from '../location/location';
import { Region }                                                                   from "../location/region";
import { CheckProductResponse }                                                     from "../response/CheckProductResponse";
import * as moment from "moment";

@Component({
  selector: 'home-page',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomePageComponent implements OnInit {
  products: Product[] = [];
  histories: History[] = [];
  productsStatus: CheckProductResponse[] = [];
  locations: Location[] = [];
  regions: Region[] = [];
  selectedLocation : Location = this.makeDefaultLocation("Select Location");
  searchProducts: Product[] = [];
  searchErrorMessage: any;
  errorMessage: any;
  histoyErrorMessage: any;
  start = 0;
  end = 100;

  constructor (private productService: ProductService, private locationService : LocationService, private historyService : HistoryService) {}

  ngOnInit(): void {
    this.locationService.getLocations().subscribe(
      locationsResponse => {
        let newLocations : Location[] = [];
        if(locationsResponse != null){
          if(locationsResponse.length > 0 && locationsResponse != null){
            for(let location of locationsResponse){
              newLocations.push(location)
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
    this.historyService.getProductsQuery(query, this.start, this.end).subscribe(
      queryResponse  => {
        if(queryResponse.histories.length > 0 && queryResponse != null){
          this.clearHistories();
          this.histories = queryResponse.histories;
        }
      },
      error =>{
        this.histoyErrorMessage = error;
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

  /*
   *
   */
   convertToDisplayedTime(time : number) : string{
     return moment(time).format("DD-MM-YYYY");
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

  private clearHistories(){
    this.histories = [];
  }
}
