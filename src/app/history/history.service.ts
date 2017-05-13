import { Injectable }                                                                  from '@angular/core';
import { Http, Response, Headers, ResponseContentType, RequestOptions, RequestMethod } from '@angular/http';
import { Observable }                                                                  from 'rxjs/Observable';
import { SearchQueryRequest }                                                          from "../requests/SearchQueryRequest";
import { SearchQueryResponse }                                                         from "../response/SearchQueryResponse";
import { SearchQueryHistoryRequest }                                                   from "app/requests/SearchQueryHistoryRequest";
import { SearchQueryHistoryResponse }                                                  from "app/response/SearchQueryHistoryResponse";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HistoryService {
  private baseUrl : string = 'http://localhost:8888/history/';
  private productsUrl : string = this.baseUrl+'product/all/';
  private searchQueryUrl : string = this.baseUrl+'product/search';

  /***
   * Constructor where the http service is injected.
   * @param http
   */
  constructor (private http: Http) {}

  /***
   * Returns an array of the search parameter.
   * @param searchTerm - product to search for.
   * @param low - low index range
   * @param high - high index range
   * @return The products associated with the search term.
   */
  getProductsQuery(searchTerm: string, low : number, high : number) : Observable<SearchQueryHistoryResponse> {
    let searchQueryBody = new SearchQueryHistoryRequest(searchTerm, low, high);
    let options = this.makeRequestOptions(searchQueryBody, this.searchQueryUrl, RequestMethod.Post);
    return this.http.request(this.searchQueryUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /***
   * Returns an array of the search parameter in location.
   * @param searchTerm - product to search for.
   * @param locationName - location to search in
   * @return The products associated with the search term.
   */
  getProductsQueryForLocation(searchTerm: string, locationName : string) : Observable<SearchQueryResponse> {
    let searchQueryBody = new SearchQueryRequest(searchTerm, locationName);
    let options = this.makeRequestOptions(searchQueryBody, this.searchQueryUrl, RequestMethod.Post);
    return this.http.request(this.productsUrl, options)
      .map(this.extractSearchProductsResponse)
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


  private extractSearchProductsResponse(res: Response)  {
    let body = res.json();
    let history : History[] = body || {};
    return history;
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
