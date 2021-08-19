import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ProfessorService } from 'src/app/features/professor/services/professor.service';
import { StudentService } from 'src/app/features/student/services/student.service';
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
    password: null,
    //STUDENT
    code_etudiant:null,
    filiere:'choisissez votre filière',
    promotion:null,
    email_perso:null,
    departement:'choisissez votre departement',
    telephone:null
  };
  socialUser: SocialUser;
  filieres=['choisissez votre filière','GI','GM','GEM','MSEI','IAGI'];
  departements=['choisissez votre departement','GI','GM','GE'];
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isFormFull = false;
  showPass = 0;

  constructor(private authService: AuthService,
    private formBuilder: FormBuilder, 
    private socialAuthService: SocialAuthService,
    private studentService: StudentService,
    private professorService: ProfessorService) { }

  ngOnInit(): void {
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

    if(groupType=="3"){
      this.authService.register({'groups': groups , 'username': username,'first_name': this.socialUser.firstName,'last_name': this.socialUser.lastName, 'password': password, 'email':this.socialUser.email}).subscribe(
      data => {
        this.registerStudentByEmail(this.socialUser.email,this.socialUser.lastName,this.socialUser.firstName,this.form.code_etudiant,this.form.email_perso,this.socialUser.email,this.form.filiere,this.form.promotion,this.form.telephone,data.user.id);                
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
    );}
    if(groupType=="2"){
      this.registerProfessorByEmail(this.socialUser.email,groups,username,password);             
      
      
    }
  }

  public ValidityWarn(){
    var submitBtn= <HTMLInputElement> document.getElementById("submitBtn");
    var ValidityFormWarn= <HTMLInputElement> document.getElementById("ValidityFormWarn");
    if( submitBtn.disabled == true ){
      ValidityFormWarn.style.display="block";
    }else{
      ValidityFormWarn.style.display="none";
    }
  }

  public PasswordEye(){
    var btn= <HTMLInputElement> document.getElementById("btn-show-pass");
    var password= <HTMLInputElement> document.getElementById("password");
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

  public createStudent(n,p,ce,epe,epr,f,pr,t,fk) {
    const student = {
      nom: n,
      prenom: p,
      code_etudiant: ce,
      email_perso: epe,
      email_pro: epr,
      filiere: f,
      promotion: pr,
      telephone: t,
      fk_user: fk
    };      
    this.studentService.create(student).subscribe();
  }

  public updateStudent(id,n,p,ce,epe,epr,f,pr,t,fk) {
    const student = {
      nom: n,
      prenom: p,
      code_etudiant: ce,
      email_perso: epe,
      email_pro: epr,
      filiere: f,
      promotion: pr,
      telephone: t,
      fk_user: fk
    };      
    this.studentService.update(id, student).subscribe();
  }

  public updateProfessor(id,n,p,epe,epr,d,t,fk) {
    const professor = {
      nom: n,
      prenom: p,
      email_perso: epe,
      email_pro: epr,
      departement: d,
      telephone: t,
      fk_user: fk
    };
    this.professorService.update(id,professor).subscribe();
  }

  public registerStudentByEmail(email,n,p,ce,epe,epr,f,pr,t,fk): any {
    this.studentService.findStudentByEmail(email).subscribe(items => { 
        if (items.id){
          this.updateStudent(items.id,n,p,ce,epe,epr,f,pr,t,fk)
        }
        else {
          this.createStudent(n,p,ce,epe,epr,f,pr,t,fk);
        }
      });
  }
  
  public registerProfessorByEmail(email,G,U,P): any {
    this.professorService.findProfessorByEmail(email).subscribe(items => {  
        if (items.id){
          this.authService.register({'groups': G , 'username': U,'first_name': this.socialUser.firstName,'last_name': this.socialUser.lastName, 'password': P, 'email':this.socialUser.email}).subscribe(
            data => {
              this.updateProfessor(items.id,this.socialUser.lastName,this.socialUser.firstName,this.form.email_perso,this.socialUser.email,this.form.departement,this.form.telephone,data.user.id);             
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
        else {
          this.errorMessage = "Cette adresse e-mail institutionnelle ne correspond pas à un professeur";
          this.isSignUpFailed = true;
        }
    });
  }
}
