import { Component, OnInit } from '@angular/core';
import { ReturnedUser } from 'src/app/auth/models/returned-user';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLoggedIn = false;
  currentUser!: ReturnedUser; 

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();
  
    if (this.isLoggedIn) {
      this.currentUser = this.token.getUser();
    } 
  }

  logout(): void {
    this.token.signOut();
    window.location.reload(); 
  }

  scrollCenter(y){
    window.scroll(0,0);
    window.scroll(0,y); // (left,top) 
  }

}
