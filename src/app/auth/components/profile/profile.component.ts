import { Component, OnInit } from '@angular/core';
import { ReturnedUser } from '../../models/returned-user';
import { TokenStorageService } from '../../services/token-storage.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser!: ReturnedUser;
  isLoggedIn = false;

  constructor(private token: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    if(this.currentUser.id){
      this.isLoggedIn=true;
    }

    // if(this.isLoggedIn == false){
    //   this.router.navigate(['/'])  
    // }
  }

}
