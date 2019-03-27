import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  openForm(){
    document.getElementById("myForm").style.display = "block";
  }

  closeForm(){
    document.getElementById("myForm").style.display = "none";
  }
}
