export class CheckProductResponse implements CheckProductResponseInterface {
  message: string;
  inStoreStatus: string;
  canCollect : boolean;

  constructor(message: string, inStoreStatus: string, canCollect : boolean) {
    this.message = message;
    this.inStoreStatus = inStoreStatus;
    this.canCollect = canCollect;
  }
}
