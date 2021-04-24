import { Component, OnInit } from '@angular/core';

declare var switchActive:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  accueilBtnID="accueilBtnID"
  AproposBtnID="AproposBtnID"
  contactBtnID="contactBtnID"
  signupBtnID="signupBtnID"
  signinBtnID="signinBtnID"

  constructor() { }

  ngOnInit(): void {
    //this.myFunction();
  }

  switchActive(id : string){
    switchActive(id);
  }

  

}
