import { Product }                                                               from "../product/product";
import { CheckProductResponse }                                                  from "./CheckProductResponse";

export class SearchQueryResponse implements SearchQueryResponseInterface {
  products: Product[];
  productStatus : CheckProductResponse[];

  constructor(products: Product[], productStatus : CheckProductResponse[]) {
    this.products = products;
    this.productStatus = productStatus;
  }
}
