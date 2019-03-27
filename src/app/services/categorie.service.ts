import {HttpClient} from "@angular/common/http";
import {CategorieDTO} from "../dto/categoriedto";
import {Observable} from "rxjs/index";
import {MainUrlService} from "./main-url.service";
import {Injectable} from "@angular/core";

const CATEGORIE_URL = '/api/v1/categories';

@Injectable()
export class CategorieService{

  constructor(private http: HttpClient, private mainUrl: MainUrlService) { }

  saveCategorie(categorie: CategorieDTO): Observable<boolean> {
    return this.http.post<boolean>(this.mainUrl.MAIN_URL + CATEGORIE_URL, categorie);
  }

  getAllCategories(): Observable<Array<CategorieDTO>> {
    return this.http.get<Array<CategorieDTO>>(this.mainUrl.MAIN_URL + CATEGORIE_URL);
  }

  deleteCategorie(id: string): Observable<boolean> {
    return this.http.delete<boolean>(this.mainUrl.MAIN_URL + CATEGORIE_URL + '/' + id);
  }

  get AllCategorieCount(): Observable<number> {
    return this.http.get<number>(this.mainUrl.MAIN_URL + CATEGORIE_URL + '/count');
  }
}
