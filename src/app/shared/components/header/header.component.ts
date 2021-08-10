import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { DOCUMENT } from '@angular/common';
import {Router} from '@angular/router';


declare function JSswitchActive(id : string):any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit, AfterViewInit{
  accueilBtnID="accueilBtnID"
  AproposBtnID="AproposBtnID"
  contactBtnID="contactBtnID"
  signupBtnID="signupBtnID"
  signinBtnID="signinBtnID"

  //private roles: string[] = [];
  isLoggedIn = false;
  //showAdminBoard = false;
  //showModeratorBoard = false;
  currentUser!: ReturnedUser; 

  constructor(
    private token: TokenStorageService,
    @Inject(DOCUMENT) private document: Document,
    private route:Router) { }

  ngOnInit(): void {
    this.loadJsFile("../../../../assets/js/header.js"); 
    this.isLoggedIn = !!this.token.getToken();
  
      if (this.isLoggedIn) {
        this.currentUser = this.token.getUser();
      }
  }  

  ngAfterViewInit(){
    //this.ActiveFunction() 
  }

  public loadJsFile(url) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }

  ActiveFunction(){
    var url= this.document.location.href;
    var specificURL = url.split("/")[3]
    if( specificURL == "register"){
      this.switchActive("signupBtnID");
    }else if( specificURL == "login" ){
      this.switchActive("signinBtnID"); 
    }else{
      this.switchActive("accueilBtnID");
    }
    console.log(specificURL);
  }

  switchActive(id : string){
    JSswitchActive(id);
  }

  logout(): void {
    this.token.signOut();
    window.location.reload(); 
    //this.route.navigate(['/']);
  }


  

}
