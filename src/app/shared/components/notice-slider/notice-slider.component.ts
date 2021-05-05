import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notice-slider',
  templateUrl: './notice-slider.component.html',
  styleUrls: ['./notice-slider.component.css']
})
export class NoticeSliderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.loadJsFile("../../../../assets/js/notice-slider.js");  
  }  

  public loadJsFile(url) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }

}
