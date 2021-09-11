import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  resetForm: FormGroup;

  forbiddenEmails: any;
  errorMessage: string;
  successMessage: string;
  IsvalidForm = true;
  isFormFull = false;
  isAccount = false;
  form: any = {
    email:null,
  }; 

  hideSpinner=true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder, 
  ) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@ensam-casa.ma$')]],
    }); 
  }

  RequestResetUser() {
    this.hideSpinner=false;
    const { email } = this.form;
    if( email ){
      this.isFormFull = true;
    }
    //console.log(email)
    this.IsvalidForm = true;

    this.authService.requestReset({'email':email}).subscribe(
      data => {
        console.log(data);
        console.log("success")
        this.form.email = null;
        this.isAccount = true;
        this.successMessage = "Lien de rénitialisation a été envoyé à l'email avec succès";
        setTimeout(() => {
          this.successMessage = null;
          this.router.navigate(['login']);
        }, 3000);
        this.hideSpinner=true;

      },
      err => {
        if (err.error.email) {
          this.errorMessage = "Aucun compte n'a été trouvé avec cet email!";
        }
      }
    );
    
  }

  public ValidityWarn(){
    const { email } = this.form;
    if( email ){
      this.isFormFull = true;
    }
    var submitBtn= <HTMLInputElement> document.getElementById("submitBtn");
    var ValidityFormWarn= <HTMLInputElement> document.getElementById("ValidityFormWarn");
    if( !this.isFormFull ){
      if( submitBtn.disabled == true ){
        ValidityFormWarn.style.display="block";
      }else{
        ValidityFormWarn.style.display="none";
      }
    }

  }

}
