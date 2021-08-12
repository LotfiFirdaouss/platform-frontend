import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm: FormGroup;

  form: any = {
    groupType: "3",
    username: null,
    password: null
  };
  socialUser: SocialUser;

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isFormFull = false;

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.loadJsFile("../../../../assets/js/register.js");
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@ensam-casa.ma$')]],
      password: ['', Validators.required]
    });    
    //,Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@cognizant.com$')
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isSignUpFailed = (user != null);
      console.log(this.socialUser);
    });  
  }

  registerWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  onSubmit(): void {
    const { username, password,groupType } = this.form;
    var groups=[groupType]
    if( username && password && groupType){
      this.isFormFull = true;
    }

    this.authService.register({'groups': groups , 'username': username,'first_name': this.socialUser.firstName,'last_name': this.socialUser.lastName, 'password': password, 'email':this.socialUser.email}).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        if(err.error.username){
          this.errorMessage = "Un compte est déjà créé avec ce nom d'utilisateur.";
        }
        if(err.error.email){
          this.errorMessage = "Un compte est déjà créé avec cet adresse email."
        }
        if(err.error.username && err.error.email){
          this.errorMessage = "Un compte est déjà créé avec ce nom d'utilisateur et cet email.";
        }
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
