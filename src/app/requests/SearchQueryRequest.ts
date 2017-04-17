export class SearchQueryRequest implements SearchQueryInterface {
  search: string;

  constructor(search: string) {
    this.search = search;
  }
}
