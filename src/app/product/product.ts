import {CheckProductResponse} from "../response/CheckProductResponse";
export class Product {
  id: string;
  name: string;
  smythsId : number;
  smythsStockCheckId: number;
  categoryId: string;
  price: number;
  listTypeId : string;
  brandId: string;
  url : string;
  status : CheckProductResponse;
}
