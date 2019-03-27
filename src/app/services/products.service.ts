import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {MainUrlService} from "./main-url.service";
import {Injectable} from "@angular/core";
import {ProductDTO} from "../dto/productdto";

const PRODUCT_URL = '/api/v1/products';
const FileUploadURL='/api/v1/products/file';
@Injectable()
export class ProductService{

  constructor(private http: HttpClient, private mainUrl: MainUrlService) { }

  saveProduct(product: ProductDTO): Observable<Array<string>> {
    return this.http.post<Array<string>>(this.mainUrl.MAIN_URL + PRODUCT_URL, product);
  }

  saveFile(fileToUpload: FormData): Observable<Array<string>> {
    return this.http.post<Array<string>>(this.mainUrl.MAIN_URL+FileUploadURL,fileToUpload)
  }

  getAllProducts(): Observable<Array<ProductDTO>> {
    return this.http.get<Array<ProductDTO>>(this.mainUrl.MAIN_URL + PRODUCT_URL);
  }

  deleteProduct(product_id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.mainUrl.MAIN_URL + PRODUCT_URL + '/' + product_id);
  }

  get AllProductCount(): Observable<number> {
    return this.http.get<number>(this.mainUrl.MAIN_URL + PRODUCT_URL + '/count');
  }
}
