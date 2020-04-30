import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class ConfigService {
  apiUrl:string = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  async getProfile(username: string): Promise<boolean> {
    const url = `${this.apiUrl}/username/${username}`
    return await this.http.get<boolean>(url).toPromise();
  }

  async createProfile(username: string): Promise<string> {
    return await this.http.post<string>(this.apiUrl+'/username', {"username": username}).toPromise();
  }
}
