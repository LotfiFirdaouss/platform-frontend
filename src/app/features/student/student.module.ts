import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProfileEtudiantComponent } from './components/profile-etudiant/profile-etudiant.component';

@NgModule({
  declarations: [
  
    ProfileEtudiantComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
})
export class StudentModule { }
