import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reportStatsName'
})
export class ReportStatsNamePipe implements PipeTransform {

  transform(users: any[], name: string): any[] {
    if (!users) {
      return [];
    }
    if (!name) {
      return users;
    }

    return users.filter( user => { 
      return user.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    });
  }

}
