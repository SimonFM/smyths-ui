import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import { HomePageComponent } from "./home/home.component";
import { ProductService } from "./product/product.service";

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot()
  ],
  providers: [ProductService],
  bootstrap: [HomePageComponent]
})

export class AppModule {

}
