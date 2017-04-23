export class CheckProductRequest implements CheckProductRequestInterface {
  productId: number;
  storeId: number;

  constructor(productId: number, storeId: number) {
    this.productId = productId;
    this.storeId = storeId;
  }
}
