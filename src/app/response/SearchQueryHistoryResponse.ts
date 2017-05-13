import { Product }                                                               from "../product/product";
import { CheckProductResponse }                                                  from "./CheckProductResponse";

export class SearchQueryHistoryResponse implements SearchQueryHistoryResponseInterface {
  message : string;
  histories: History[];

  constructor(message : string, histories: History[]) {
    this.message = message;
    this.histories = histories;
  }
}
