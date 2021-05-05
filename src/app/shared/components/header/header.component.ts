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
    
    this.loadJsFile("../../../../assets/js/header.js");  
  }  

  public loadJsFile(url) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }

  switchActive(id : string){
    switchActive(id);
  }

  

}
