import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  expression = '^[a-zA-Z0-9_ ]*$';
  show;

  displaySearch = true;

  constructor(private route: Router) { }


  ngOnInit() {
  }

  searchShow() {
    //validate expression
    var matches = this.show.match(this.expression);
    if (matches != null) {
      this.route.navigate(["search", this.show]);
    } else {
      alert("Search without special characters!");
      this.show = "";

    }

  }

  showInputSearch(){
    this.displaySearch = false;
  }
  HideInputSearch(){
    this.displaySearch = true;
  }
}

