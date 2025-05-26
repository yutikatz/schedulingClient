import { HttpClient } from '@angular/common/http';
import { ContentChildFunction, inject, Inject, Injectable } from '@angular/core';
import { combineLatest, Observable, tap } from 'rxjs';
 import { IpConfig } from '../modal/ip-config';
import { Scheduling } from '../modal/scheduleing.modal';
 
@Injectable({  providedIn: 'root'})
export class SchedulingService {
  private apiUrl = '';
  #http = inject(HttpClient);

  initIp(url: string): Promise<any> {
    return combineLatest(
      this.#http.get<IpConfig>(url), 
      ).pipe(
        tap(config => this.apiUrl = config[0].servicePath )
      ).toPromise();
  }

 

  // GET: קבלת רשימת המשימות
  getSchedulings$(): Observable<Scheduling[]> {
    return this.#http.get<Scheduling[]>(`${this.apiUrl}/getSchedulings`);
  }

  // POST: הוספת משימה חדשה
  addScheduling$(Scheduling: Scheduling): Observable<Scheduling> {
    return this.#http.post<Scheduling>(`${this.apiUrl}/addScheduling`, Scheduling);
  }

  // PUT: עדכון משימה קיימת
  updateScheduling$(updatedScheduling: Scheduling): Observable<void> {
    const {userId} = updatedScheduling
    return this.#http.put<void>(`${this.apiUrl}/updateScheduling/${userId}`, updatedScheduling);
  }

  // DELETE: מחיקת משימה
  deleteScheduling$(userId: string): Observable<void> {
    return this.#http.delete<void>(`${this.apiUrl}/delete/${userId}`);
  }
}
