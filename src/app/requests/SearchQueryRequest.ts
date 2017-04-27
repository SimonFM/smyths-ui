export class SearchQueryRequest implements SearchQueryInterface {
  search: string;
  locationName : string;

  constructor(search : string, location? : string ){
    this.search = search;
    this.locationName = (location)? location : "";
  }
}
