import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    groupType: "3",
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isFormFull = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadJsFile("../../../../assets/js/register.js");  
  }

  onSubmit(): void {
    const { username, email, password,groupType } = this.form;
    var groups=[groupType]
    if( username && password && email && groupType){
      this.isFormFull = true;
    }

    this.authService.register({'groups': groups , 'username': username, 'password': password, 'email':email}).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.username[0];
        this.isSignUpFailed = true;
      }
    );
  }

  public loadJsFile(url) {  
    let node = document.createElement('script');  
    node.src = url;  
    node.type = 'text/javascript';  
    document.getElementsByTagName('head')[0].appendChild(node);  
  }
  
}
