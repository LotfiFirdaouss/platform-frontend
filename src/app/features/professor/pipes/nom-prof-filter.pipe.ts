import { Pipe, PipeTransform } from '@angular/core';
import { Professor } from '../models/professor';

@Pipe({
  name: 'nomProfFilter'
})
export class NomProfFilterPipe implements PipeTransform {

  transform(professors: Professor[], nom: string): Professor[] {
    if (!professors) {
      return [];
    }
    if (!nom) {
      return professors;
    }

    return professors.filter( professor => { 
      return this.professorOfNom(professor, nom);
    });
  }

  private professorOfNom(professor : Professor, nom){
    return professor.prenom.toLocaleLowerCase().includes(nom.toLocaleLowerCase())
    || professor.nom.toLocaleLowerCase().includes(nom.toLocaleLowerCase());
  }

}
