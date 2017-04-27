import { Product }                                                               from "../product/product";
import { CheckProductResponse }                                                  from "./CheckProductResponse";

export class SearchQueryResponse implements SearchQueryResponseInterface {
  error : string;
  message : string;
  products: Product[];
  productStatus : CheckProductResponse[];

  constructor(error : string, message : string, products: Product[], productStatus : CheckProductResponse[]) {
    this.error = error;
    this.message = message;
    this.products = products;
    this.productStatus = productStatus;
  }
}
