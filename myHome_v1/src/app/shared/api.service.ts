import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'assets'

  constructor(
    private http: HttpClient
  ) { }

  /**
   * GET method
   * 
   * @template T Response type
   * @param endpoint API endpoint
   * @param params Query parameters
   * @returns API response
   * 
   */
  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params });
  }

  /**
   * POST method
   * 
   * @param {string} endpoint endpoint - API endpoint.
   * @param data Request body
   * @param headers Headers
   * @returns API response
   * 
   */
  post<T>(endpoint: string, data: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, { headers });
  }

}
