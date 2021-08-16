import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import {Router} from "@angular/router"
import { ReturnedUser } from '../../models/returned-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  isFormFull = false;

  //to determine the role and path to tk
  currentUser!: ReturnedUser;
  group="";
  isProfessor=false;
  isStudent=false;
  isAdministrator=false;

  constructor(
    private authService: AuthService, 
    private token: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadJsFile("../../../../assets/js/Login.js");  
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.token.getUser();
      this.group = this.currentUser.groups[0];
      if( this.group == "Administrator"){
        this.isAdministrator = true;
      }else if( this.group == "Professor" ){
        this.isProfessor = true;
      }else{
        this.isStudent = true;
      }
      this.router.navigate(['/home']);
    }  
  }

  onSubmit(): void {
    const { username, password } = this.form;
    if( username && password){
      this.isFormFull = true;
    }

    this.authService.login({'username': username, 'password': password}).subscribe(
      data => {
        this.token.saveToken(data);
        this.token.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        //this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.detail;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
    console.log(this.token.getUser())
  }

  public loadJsFile(url) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }

}
