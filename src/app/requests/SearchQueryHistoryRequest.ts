export class SearchQueryHistoryRequest implements SearchQueryHistoryInterface {
  low: number;
  high: number;
  search: string;

  constructor(search : string, low : number, high : number){
    this.search = search;
    this.high = high;
    this.low = low;
  }
}
