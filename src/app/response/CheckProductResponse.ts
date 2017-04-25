export class CheckProductResponse implements CheckProductResponseInterface {
  message: string;
  inStoreStatus: string;
  canCollect : boolean;
  locationId : number;
  productId : string;

  constructor(message: string, inStoreStatus: string, locationId: number, productId: string, canCollect : boolean) {
    this.message = message;
    this.inStoreStatus = inStoreStatus;
    this.canCollect = canCollect;
    this.productId = productId;
    this.locationId = locationId;
  }
}
