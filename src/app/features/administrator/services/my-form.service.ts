import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from 'src/app/shared/GlobalConstants';

const baseUrlFormReport = GlobalConstants.backendApiURL+'api/forms';

@Injectable({
  providedIn: 'root'
})
export class MyFormService {

  constructor(private http: HttpClient) { }

  get(id: any): Observable<any> {
    return this.http.get(`${baseUrlFormReport}/${id}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrlFormReport}/${id}`, data);
  }
}
