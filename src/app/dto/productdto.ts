import {CategorieDTO} from "./categoriedto";

export class ProductDTO{
      product_id: string;
      product_name: string;
      description: string;
      product_image: string;
      quantity: number;
      unitPrice: number;
      categorieDTO: CategorieDTO = new CategorieDTO();
}
