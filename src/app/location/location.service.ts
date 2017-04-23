import { Injectable }                                                                 from '@angular/core';
import { Http, Response, Headers, ResponseContentType, RequestOptions, RequestMethod} from '@angular/http';
import { Observable }                                                                 from 'rxjs/Observable';
import { Location }                                                                   from './location';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { GetAllLocationsRequest } from "../requests/GetAllLocationsRequest";

@Injectable()
export class LocationService {
  private baseUrl : string = 'http://localhost:8888/location/';
  private locationsUrl : string = this.baseUrl+'all/';

  /***
   * Constructor where the http service is injected.
   * @param http
   */
  constructor (private http: Http) {}

  /***
   * Returns an array of the locations
   * @param start
   * @param end
   * @returns {Observable<Location[]>}
   */
  getLocations(): Observable<Location[]> {
    let getAllLocationsRequest : GetAllLocationsRequest = new GetAllLocationsRequest();
    let options = this.makeRequestOptions(getAllLocationsRequest, this.locationsUrl, RequestMethod.Get);
    return this.http.request(this.locationsUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  /**
   * Makes the Headers for the requests
   * @returns {Headers}
   */
  private makeHeaders() : Headers{
    return new Headers({ 'Content-Type': 'application/json'});
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

  /***
   * For a successful result.
   * @param res
   * @returns {any|{}}
   */
  private extractData(res: Response) {
    let body = res.json();
    let locations : Location[] = body || {};
    return locations;
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
}
