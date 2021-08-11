import { Component, OnInit } from '@angular/core';

declare function aos_init():any;

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor() { }

  ngOnInit() {  
    this.loadJsFile("../../../../assets/js/welcome.js"); 
     
  }  

  public loadJsFile(url) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node); 
    //aos_init();  
  }

}
