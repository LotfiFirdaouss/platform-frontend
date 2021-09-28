import { AfterViewInit, Component, HostListener, Inject, OnInit } from '@angular/core';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { DOCUMENT } from '@angular/common';
import {Location} from '@angular/common';

declare function JSswitchActive(id : string):any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit{

  //private roles: string[] = [];
  isLoggedIn = false;
  currentUser!: ReturnedUser; 
  group="";
  isProfessor=false;
  isStudent=false;
  isAdministrator=false;

  currentRoute:String;
  loggingOut=false;

  constructor(
    private token: TokenStorageService,
    @Inject(DOCUMENT) private document: Document,
    private location: Location) { }

  @HostListener('window:scroll', ['$event']) // for window scroll events
    onScroll(event) {
      var addedNav = <HTMLElement> this.document.getElementById("addedNav");
      addedNav.classList.add("hideAdditionnalNav")
      // console.log("Scroll Event", window.pageYOffset );
      if(window.pageYOffset==0){
        addedNav.classList.remove("hideAdditionnalNav");
      }
  }  

  ngOnInit(): void {
    // this.openNav();
    this.loadJsFile("../../../../assets/js/header.js"); 
    this.isLoggedIn = !!this.token.getToken();
  
    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
      this.group = this.currentUser.groups[0];
      if( this.group == "Administrator"){
        this.isAdministrator = true;
      }else if( this.group == "Professor" ){
        this.isProfessor = true;
      }else{
        this.isStudent = true;
      }
    } 
    this.scrollCenter(0);

    // this.currentRoute = this.location.path();
    // //activating appopriate btn depending on currentRoute
    // console.log(this.currentRoute)
    // if( this.currentRoute == "/" ){
    //   this.menuActiveLinkFuncFromRoute("accueilBtnID");
    // }else if(this.currentRoute == "/%C3%A0-propos"){
    //   this.menuActiveLinkFuncFromRoute("AproposBtnID");
    // }else if(this.currentRoute == "/contact"){
    //   this.menuActiveLinkFuncFromRoute("contactBtnID");
    // }else if(this.currentRoute == "/register"){
    //   this.menuActiveLinkFuncFromRoute("signupBtnID");
    // }else if(this.currentRoute == "/login" || this.currentRoute == "/home"){
    //   this.menuActiveLinkFuncFromRoute("signinBtnID");
    // }
    // else if(this.currentRoute == "/home"){
    //   this.menuActiveLinkFuncFromRoute("homeBtnID");
    // }else if(this.currentRoute == "/profile"){
    //   this.menuActiveLinkFuncFromRoute("profileBtnID");
    // }
    // this.closeNav();
  }  

  public loadJsFile(url) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }

  // ActiveFunction(){
  //   var url= this.document.location.href;
  //   var specificURL = url.split("/")[3]
  //   if( specificURL == "register"){
  //     this.switchActive("signupBtnID");
  //   }else if( specificURL == "login" ){
  //     this.switchActive("signinBtnID"); 
  //   }else{
  //     this.switchActive("accueilBtnID");
  //   }
  //   console.log(specificURL);
  // }

  // switchActive(id : string){
  //   JSswitchActive(id);
  // }

  logout(): void {
    // this.openNav();
    this.loggingOut= true;
    this.token.signOut();
    this.logOutActive();
    window.location.reload(); 
  }

  scrollCenter(y){
    window.scroll(0,0);
    window.scroll(0,y); // (left,top) 
  } 

  // public menuActiveLinkFunc(event){
  //   var activeLinks = document.getElementsByClassName("Hactive");
  //   //console.log("old active links",activeLinks[0])
  //   this.currentRoute = this.location.path();
  //   console.log(activeLinks)
  //   activeLinks[0]?.classList.replace("Hactive","inactive")
  //   activeLinks[1]?.classList.replace("Hactive","inactive")

  //   var target = event.target || event.srcElement || event.currentTarget;
  //   var idAttr = target.attributes.id;
  //   var value = idAttr.nodeValue;
  //   var Element = <HTMLLIElement> document.getElementById(value);
  //   Element.classList.replace("inactive","Hactive");
  
  //   // console.log(activeLinks[0])
  //   // console.log(activeLinks[1])
  //   // console.log(activeLinks[2])

  // }

  // public menuActiveLinkFuncFromRoute(aId){
  //   this.currentRoute = this.location.path();
  //   //removing active from default active link
  //   console.log("default active:")
  //   if( !this.isLoggedIn ){
  //       var activeAccueilLink = <HTMLElement> document.getElementById("accueilBtnID");
  //       //console.log(activeAccueilLink)
  //       activeAccueilLink.classList.replace("Hactive","inactive")
      
  //   }

  //   //console.log("new active:")
  //   //adding acting into cuurent active page depending on current URL
  //   var link = document.getElementById(aId);
  //   //console.log(link)
  //   link.classList.replace("inactive","Hactive")
  // }

  public logOutActive(){
    var activeAccueilLink = <HTMLElement> document.getElementById("accueilBtnID");
    activeAccueilLink.classList.replace("Hactive","inactive")
    var logInLink = <HTMLElement> document.getElementById("signinBtnID");
    logInLink.classList.replace("inactive","Hactive")

  }
  
  // showSpinner(){
  //   var spinner = <HTMLElement> document.getElementsByTagName("app-spinner")[0];
  //   spinner.classList.replace("hidden","visible");
  // }

  // hideSpinner(){
  //   var spinner = <HTMLElement> document.getElementsByTagName("app-spinner")[0];
  //   spinner.classList.replace("visible","hidden");
  // }

  // /* Open */
  // openNav() {
  //   document.getElementById("myNav").style.display = "block";
  // }

  // /* Close */
  // closeNav() {
  //   document.getElementById("myNav").style.display = "none";
  // }


}
