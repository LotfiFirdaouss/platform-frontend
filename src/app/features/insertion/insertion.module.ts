import { NgModule } from '@angular/core';
import { InsertionsListComponent } from './components/insertions-list/insertions-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddInsertionComponent } from './components/add-insertion/add-insertion.component';
import { InsertionDetailsComponent } from './components/insertion-details/insertion-details.component';
import { InsertionInfoComponent } from './components/insertion-info/insertion-info.component';
import { InsertionStudentComponent } from './components/insertion-student/insertion-student.component';
import { EtudiantFilterPipe } from './pipes/etudiant-filter.pipe';
import { PromotionFilterPipe } from './pipes/promotion-filter.pipe';
import { FiliereFilterPipe } from './pipes/filiere-filter.pipe';
import { InsertionTypeFilterPipe } from './pipes/insertion-type-filter.pipe';
import { PromotionInsertionFilterPipe } from './pipes/promotion-insertion-filter.pipe';
import { FiliereInsertionFilterPipe } from './pipes/filiere-insertion-filter.pipe';
import { VilleInsertionFilterPipe } from './pipes/ville-insertion-filter.pipe';
import { PaysInsertionFilterPipe } from './pipes/pays-insertion-filter.pipe';
import { PosteInsertionFilterPipe } from './pipes/poste-insertion-filter.pipe';
import { SocieteInsertionFilterPipe } from './pipes/societe-insertion-filter.pipe';
import { UnivInsertionFilterPipe } from './pipes/univ-insertion-filter.pipe';
import { NatFormationInsertionFilterPipe } from './pipes/nat-formation-insertion-filter.pipe';
import { IntitFormationInsertionFilterPipe } from './pipes/intit-formation-insertion-filter.pipe';


@NgModule({
  declarations: [
    InsertionsListComponent,
    AddInsertionComponent,
    InsertionDetailsComponent,
    InsertionInfoComponent,
    InsertionStudentComponent,
    EtudiantFilterPipe,
    PromotionFilterPipe,
    FiliereFilterPipe,
    InsertionTypeFilterPipe,
    PromotionInsertionFilterPipe,
    FiliereInsertionFilterPipe,
    VilleInsertionFilterPipe,
    PaysInsertionFilterPipe,
    PosteInsertionFilterPipe,
    SocieteInsertionFilterPipe,
    UnivInsertionFilterPipe,
    NatFormationInsertionFilterPipe,
    IntitFormationInsertionFilterPipe
  ],
  imports: [
    SharedModule
  ]
})
export class InsertionModule { }
