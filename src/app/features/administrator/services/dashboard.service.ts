import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Report } from '../../report/models/report';
import { map } from 'rxjs/operators';
import { GlobalConstants } from 'src/app/shared/GlobalConstants';


const baseUrl = GlobalConstants.backendApiURL+'api/rapports';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getAllReportStageValidatedAndFiltered(year: number, promotion: string): Observable<Report[]> {
    return this.http.get<Report[]>(`${baseUrl}/validatedFiltered?year=${year}&promotion=${promotion}&type=True`);
  }
  
  getAllReportProjetValidatedAndFiltered(year: number, promotion: string): Observable<Report[]> {
    // return this.http.get<Report[]>(baseUrl).pipe(map(result =>result.filter(report => report.stage_ou_projet===false && report.valid_admin===true)));
    return this.http.get<Report[]>(`${baseUrl}/validatedFiltered?year=${year}&promotion=${promotion}&type=False`);

  }  

  
}
