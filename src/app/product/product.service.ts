import { Injectable }                                                                 from '@angular/core';
import { Http, Response, Headers, ResponseContentType, RequestOptions, RequestMethod} from '@angular/http';
import { Observable }                                                                 from 'rxjs/Observable';
import { Product }                                                                    from './product';
import { GetProductRequest }                                                          from '../requests/GetProductRequest';
import { SearchQueryRequest }                                                         from "../requests/SearchQueryRequest";
import { CheckProductRequest }                                                        from "../requests/CheckProductRequest";
import { CheckProductResponse }                                                       from "../response/CheckProductResponse";
import { SearchQueryResponse }                                                        from "../response/SearchQueryResponse";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';



@Injectable()
export class ProductService {
  private baseUrl : string = 'http://localhost:8888/product/';
  private productsUrl : string = this.baseUrl+'all/';
  private productsAvailabilityUrl : string = this.baseUrl+'available/';
  private searchQueryUrl : string = this.baseUrl+'search/';

  /***
   * Constructor where the http service is injected.
   * @param http
   */
  constructor (private http: Http) {}

  /***
   * Returns an array of the search parameter.
   * @param searchTerm - product to search for.
   * @return The products associated with the search term.
   */
  getProductsQuery(searchTerm: string) : Observable<SearchQueryResponse> {
    let searchQueryBody = new SearchQueryRequest(searchTerm);
    let options = this.makeRequestOptions(searchQueryBody, this.searchQueryUrl, RequestMethod.Post);
    return this.http.request(this.productsUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /***
   * Returns an array of the search parameter in location.
   * @param searchTerm - product to search for.
   * @param locationId - location to search in
   * @return The products associated with the search term.
   */
  getProductsQueryForLocation(searchTerm: string, locationId :number) : Observable<SearchQueryResponse> {
    let searchQueryBody = new SearchQueryRequest(searchTerm, locationId);
    let options = this.makeRequestOptions(searchQueryBody, this.searchQueryUrl, RequestMethod.Post);
    return this.http.request(this.productsUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Sends the product request for the query provided.
   * @param searchQueryBody
   * @returns {Observable<R|T>}
   */
  private sendProductAvailabilityRequest(searchQueryBody: SearchQueryRequest) : Observable<SearchQueryResponse> {
    let options = this.makeRequestOptions(searchQueryBody, this.searchQueryUrl, RequestMethod.Post);
    return this.http.request(this.productsUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /***
   * Returns an array of the products (for testing)
   * @param start
   * @param end
   * @returns {Observable<Product[]>}
   */
  getProducts(start : number , end : number): Observable<Product[]> {
    let getProductRequestBody : GetProductRequest = new GetProductRequest(start, end);
    let options = this.makeRequestOptions(getProductRequestBody, this.productsUrl, RequestMethod.Post);
    return this.http.request(this.productsUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Checks a location for the status of the product
   * @param productId
   * @param storeId
   * @returns status of {string}
   */
  getProductAvailability(productId : number, storeId : number) : Observable<CheckProductResponse>{
    let getStatusBody : CheckProductRequest = new CheckProductRequest(productId, storeId);
    let options = this.makeRequestOptions(getStatusBody, this.productsAvailabilityUrl, RequestMethod.Post);
    return this.http.request(this.productsAvailabilityUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /***
   * Makes the request options for the given body.
   * @param body
   * @param url
   * @param method
   * @returns {RequestOptions}
   */
  private makeRequestOptions (body : any, url : string, method : RequestMethod) : RequestOptions{
    let headers = this.makeHeaders();
    let options = new RequestOptions();

    options.headers = headers;
    options.body = JSON.stringify(body);
    options.method = method;
    options.url = url;
    options.responseType = ResponseContentType.Json;
    return options;
  }


  private extractSearchProductsResponse(res: Response) : Product[] {
    let body = res.json();
    let products : Product[] = JSON.parse(body.products) || {};
    return products;
  }

  /***
   * For when there's an error.
   * @param error
   * @returns {any}
   */
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  /***
   * For a successful result.
   * @param res
   * @returns {any|{}}
   */
  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  /**
   * Makes the Headers for the requests
   * @returns {Headers}
   */
  private makeHeaders() : Headers{
    return new Headers({ 'Content-Type': 'application/json'});
  }
}
