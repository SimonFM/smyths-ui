export class SearchQueryRequest implements SearchQueryInterface {
  search: string;
  locationId : number;

  constructor(search : string, location? : number ){
    this.search = search;
    this.locationId = (location)? location : -1;
  }
}
