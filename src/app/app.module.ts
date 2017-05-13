import { BrowserModule }                                                       from '@angular/platform-browser';
import { NgModule }                                                            from '@angular/core';
import { FormsModule }                                                         from '@angular/forms';
import { HttpModule }                                                          from '@angular/http';
import { HomePageComponent }                                                   from "./home/home.component";
import { DropdownModule }                                                      from "ngx-dropdown";
import { ProductService }                                                      from "./product/product.service";
import { LocationService }                                                     from "./location/location.service";
import { HistoryService }                                                      from "./history/history.service";
import { platformBrowserDynamic }                                              from "@angular/platform-browser-dynamic";

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    DropdownModule
  ],
  providers: [
    ProductService,
    LocationService,
    HistoryService
  ],
  bootstrap: [
    HomePageComponent
  ]
})

export class AppModule {

}

platformBrowserDynamic().bootstrapModule(AppModule);
