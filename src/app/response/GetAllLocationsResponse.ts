import { Region }                                                                     from "../location/region";

export class GetAllLocationsResponse implements GetAllLocationsResponseInterface {
  total : number;
  countryImage : string;
  data : Region[];


  constructor(total : number, countryImage : string, data : Region[]){
    this.total = total;
    this.countryImage = countryImage;
    this.data = data;
  }


}
