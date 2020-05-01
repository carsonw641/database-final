import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';
import { Gift } from '../components/create-item/create-item.component';
import { ProfileData } from '../components/profile-component/profile-dialog.component';

@Injectable()
export class ConfigService {
  apiUrl:string = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  async getProfile(username: string): Promise<boolean> {
    const url = `${this.apiUrl}/username/${username}`
    return await this.http.get<string>(url, {responseType: 'text' as 'json'}).toPromise().then(value => {
      return value === "true"
    });
  }

  async getProfiles(): Promise<ProfileData[]> {
    return await this.http.get<ProfileData[]>(this.apiUrl+'/users').toPromise();
  }

  async createProfile(username: string, email: string): Promise<void> {
    return await this.http.post<void>(this.apiUrl+'/username', {
      "name": username, 
      "email": email}).toPromise();
  }

  async createItem(gift: Gift): Promise<void> {
    return await this.http.post<void>(this.apiUrl+'/item', gift).toPromise();
  }

  async getItems(email: string): Promise<Gift[]> {
    const url = `${this.apiUrl}/item/${email}`;
    return await this.http.get<Gift[]>(url).toPromise();
  }

  async updateItem(gift: Gift): Promise<void> {
    return await this.http.put<void>(this.apiUrl+'/item', gift).toPromise();
  }

  async deleteItem(id: string): Promise<void> {
    const url = `${this.apiUrl}/item/${id}`;
    return await this.http.delete<void>(url).toPromise();
  }

 
}
