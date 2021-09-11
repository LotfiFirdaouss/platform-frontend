import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {
  
  ResponseResetForm: FormGroup;

  errorMessage: string;
  successMessage: string;
  resetToken: null;
  email:null;
  CurrentState: any;
  IsResetFormValid = true;
  form: any = {
    newPassword:null,
    confirmPassword:null
  };  
  showPass = 0;
  isFormFull = false;

  // newPasswordId="newPassword"
  // confirmPasswordId="confirmPassword"

  hideSpinner=true;


  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { 
    this.CurrentState = 'Wait';
    this.route.params.subscribe(params => {
      this.resetToken = params.token;
      this.email = params.email;
      console.log(this.resetToken);
      // console.log(this.email);
      this.VerifyToken();
    });
  }

  ngOnInit(): void {
    this.Init();
  }

  VerifyToken() {
    this.authService.ValidPasswordToken({ token: this.resetToken, email: this.email }).subscribe(
      data => {
        console.log(data)
        this.CurrentState = 'Verified';
      },
      err => {
        console.log(err)
        this.CurrentState = 'NotVerified';
      }
    );
  }

  Init() {
    this.ResponseResetForm = this.fb.group(
      {
        resettoken: [this.resetToken],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      }
    );
  }

  Validate() {
    const new_password = this.form.newPassword;
    const confirm_password = this.form.confirmPassword;

    if (confirm_password.length <= 0) {
      return false;
    }

    if (confirm_password !== new_password) {
      return false;
    }

    return true;
  }

  ResetPassword() {
    this.hideSpinner=false;
    if (this.Validate()) {
      this.isFormFull = true;
      this.IsResetFormValid = true;
      console.log(this.form.newPassword)
      this.authService.newPassword({token : this.resetToken, password : this.form.newPassword}).subscribe(
        data => {
          this.form ={
            newPassword:null,
            confirmPassword:null
          }; 
          this.successMessage = "Mot de passe rénitialisé !";
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['login']);
          }, 3000);
          this.hideSpinner=true;
        },
        err => {
          var erreurPwd=err.error.password;
          if(erreurPwd){
            if (erreurPwd.includes("This password is too common.")) {
              this.errorMessage = "Ce mot de passe est trop facile.";
            }else if( erreurPwd.includes("This password is entirely numeric.")){
              this.errorMessage = "Ce mot de passe est entièrement numérique.";
            }else if(erreurPwd.includes("This password is too common.") && erreurPwd.includes("This password is entirely numeric.")){
              this.errorMessage = "Ce mot de passe est trop facile et entièrement numérique.";
            }
          }
          console.log(err.error)

        }
      );
    } else { 
      this.IsResetFormValid = false;
    }
  }

  public ValidityWarn(){
    console.log("validity")
    var submitBtn= <HTMLInputElement> document.getElementById("submitBtn");
    var ValidityFormWarn= <HTMLInputElement> document.getElementById("ValidityFormWarn");
    if( submitBtn.disabled == true ){
      //console.log(1)
      ValidityFormWarn.style.display="block";
    }else{
      //console.log(2)
      if( !this.Validate()){
        //console.log("fff")
        ValidityFormWarn.style.display="block";
      }else{
        ValidityFormWarn.style.display="none";
      }
    }
  }

  public PasswordEye(passwordId){
    //console.log(passwordId);
    var password,btn;
    if(passwordId ==1){
      btn= <HTMLInputElement> document.getElementById("btn-show-pass1");
      password = <HTMLInputElement> document.getElementById("newPassword");
    }else{
      btn= <HTMLInputElement> document.getElementById("btn-show-pass2");
      password = <HTMLInputElement> document.getElementById("confirmPassword");
    }
    if( this.showPass == 0 ){ 
      password.setAttribute('type','text');     
      btn.classList.remove('zmdi-eye');
      btn.classList.add('zmdi-eye-off');
      this.showPass = 1;
    }else{
      password.setAttribute('type','password');
      btn.classList.add('zmdi-eye');
      btn.classList.remove('zmdi-eye-off');
      this.showPass = 0;
    }
  }

}
