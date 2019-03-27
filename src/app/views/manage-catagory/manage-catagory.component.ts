import {Component, OnInit, ViewChild} from '@angular/core';
import {CategorieDTO} from "../../dto/categoriedto";
import {NgForm} from "@angular/forms";
import {CategorieService} from "../../services/categorie.service";

@Component({
  selector: 'app-manage-catagory',
  templateUrl: './manage-catagory.component.html',
  styleUrls: ['./manage-catagory.component.css']
})
export class ManageCatagoryComponent implements OnInit {

  curruntCategorie: CategorieDTO = new CategorieDTO();
  categorieList: Array<CategorieDTO> = [];
  isCategorieSelected = false;
  @ViewChild('formCategorie')
  formCategorie: NgForm;

  constructor(private categorieService: CategorieService) { }

  ngOnInit() {
    this.loadAllCategories();
  }

  loadAllCategories(): void {
    this.categorieService.getAllCategories()
      .subscribe((result) => {
        this.categorieList = result;
      });
  }

  saveCategorie(): void {
    this.categorieService.saveCategorie(this.curruntCategorie)
      .subscribe((result) => {
        if (result) {
          alert('Categorie has been saved successfully');
          this.loadAllCategories();
          this.clear();
        } else {
          alert('Failed to save the Categorie');
        }
      });
  }

  deleteCategorie(categorie: CategorieDTO): void {
    this.categorieService.deleteCategorie(categorie.categorie_id)
      .subscribe((result) => {
        if (result) {
          this.loadAllCategories();
          this.clear();
          alert('Categorie has been deleted successfully');
        } else {
          alert('Failed to delete the Categorie');
        }
      });
  }

  selectCategorie(categorie: CategorieDTO): void {
    this.curruntCategorie = categorie;
    this.isCategorieSelected = true;
  }

  clear(): void {
    this.curruntCategorie = new CategorieDTO();
    this.isCategorieSelected = false;
  }
}
