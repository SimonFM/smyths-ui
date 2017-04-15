/**
 * Created by simon on 14/04/2017.
 */
export class GetProductRequest implements GetProductsRequestInterface {
  lowRange: number;
  highRange: number;

  constructor(lowRange: number, highRange: number) {
    this.lowRange = lowRange;
    this.highRange = highRange;
  }
}
