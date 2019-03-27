import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProductDTO} from "../../dto/productdto";
import {ProductService} from "../../services/products.service";
import {CategorieService} from "../../services/categorie.service";
import {CategorieDTO} from "../../dto/categoriedto";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent implements OnInit {

  curruntProduct: ProductDTO = new ProductDTO();
  productList: Array<ProductDTO> = [];
  categorieList: Array<CategorieDTO> = [];
  categorie:CategorieDTO = new CategorieDTO();
  isProductSelected = false;
  @ViewChild('formProduct')
  formProduct: NgForm;
  // url1:string;
  public linkColor = '#0000ff';
  private file: string;
  tempProduct: ProductDTO = null;
  manuallSelected: boolean = false;
  imageFile:File;

  // fileToUpload: File=null;

  constructor(private productService: ProductService,private categorieService: CategorieService,private http: HttpClient) {}

  ngOnInit() {
    this.loadAllProducts();
    this.loadAllCategories();
    if(this.categorieList.length > 0){
      this.categorie.categorie_id = this.categorieList[0].categorie_id;
    }
  }

  // onFileChanged(event){
  //   if (event.target.files && event.target.files[0]){
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]);
  //     reader.onload = (event)
  //     this.url1 = event.target.result;
  //   }
  // }

  // handleFileInput(files: FileList){
  //   this.fileToUpload = files.item(0);
  // }
  // uploadFileToActivity(){
  //   this.productService.postFile(this.fileToUpload).subscribe(data=>{
  //     //if upload success
  //     },error=>{
  //     console.log(error);
  //   });
  // }

  setColor(newColor){
    console.log('value',newColor);
    this.linkColor = newColor;
  }

  // onFileChanged(event: any){
  //   this.files=event.target.files;
  // }
  // onUpload(){
  //   // const formData = new FormData();
  //   // for(const file of this.files){
  //   //   formData.append(name,file,file.name);
  //   // }
  //   // this.http.post('singleFileUpload',formData).subscribe();
  //   const formData = new FormData();
  //   formData.append("singleFileUpload",this.file);
  //   console.log(this.file)
  //   this.productService.onUpload(formData).subscribe(){
  //     (result)=>{}
  //   }
  // }

  // onUpload(){
  //   const formDatas:FormData=new FormData();
  //   formDatas.append("file",this.file);
  //   this.productService.onUpload(formDatas).subscribe(
  //     (result)=>{
  //       if(result){
  //         alert("Sucsess")
  //       }
  //     }
  //   )
  //
  // }

  loadAllProducts(): void {
    this.productService.getAllProducts()
      .subscribe((result) => {
        this.productList = result;
      });
  }

  loadAllCategories(): void {
    this.categorieService.getAllCategories()
      .subscribe((result) => {
        this.categorieList = result;
      });
  }

  // saveProduct(): void {
  //   this.curruntProduct.categorieDTO = this.categorie;
  //   this.onUpload();
  //   this.productService.saveProduct(this.curruntProduct)
  //     .subscribe((result) => {
  //       if (result) {
  //         alert('Product has been saved successfully');
  //         this.loadAllProducts();
  //         this.clear();
  //       } else {
  //         alert('Failed to save the Product');
  //       }
  //     });
  // }
  selectProduct(product: ProductDTO):void{
    this.clear()
    this.curruntProduct = product;
    this.tempProduct = Object.assign({},product);
    this.manuallSelected = true;
  }
  saveProduct():void{
    this.curruntProduct.categorieDTO = this.categorie;
    const formDatas:FormData = new FormData();
    formDatas.append("file",this.imageFile);
    console.log('saveFile>this.imageFile:'+this.imageFile);
    this.productService.saveFile(formDatas).subscribe((result)=>{
      if(result) {
        this.curruntProduct.product_image = result[0];
        this.productService.saveProduct(this.curruntProduct).subscribe(
          (result) => {
            if (result) {
              confirm("success")
            }
          })
      }
    })
  }
  setIma(event){
    console.log("aa")
    const fil = event.target.files[0]
    this.imageFile = fil;
    console.log(this.imageFile)
  }
  // saveProduct(): void {
  //   this.curruntProduct.categorieDTO = this.categorie;
  //   const formData:FormData=new FormData();
  //   formData.append("file",this.imageFile);
  //   console.log(this.imageFile)
  //   this.productService.onUpload(formData).subscribe(
  //     (result)=>
  //     {
  //       if(result){
  //         this.productService.saveProduct(this.curruntProduct).subscribe(
  //           (result )=> {
  //             if(result){
  //               confirm("success")
  //             }
  //           }
  //         )
  //       }
  //     }
  //   )

  deleteProduct(product: ProductDTO): void {
    this.productService.deleteProduct(product.product_id)
      .subscribe((result) => {
        if (result) {
          this.loadAllProducts();
          this.clear();
          alert('Product has been deleted successfully');
        } else {
          alert('Failed to delete the Product');
        }
      });
  }

  // selectProduct(product: ProductDTO): void {
  //   this.curruntProduct = product;
  //   this.isProductSelected = true;
  // }

  clear(): void {
    this.curruntProduct = new ProductDTO();
    this.isProductSelected = false;
  }

  upload(event):void{
    this.file=event.target.files[0];
    console.log(this.file)
  }
}
