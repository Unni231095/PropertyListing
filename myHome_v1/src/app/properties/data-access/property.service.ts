import { Injectable } from '@angular/core';
import { ApiService } from '../../shared/api.service';
import { Observable, of, tap } from 'rxjs';
import { SearchResults } from '../utils/search-results';
import { Property } from '../utils/property';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private cache: SearchResults | null = null;

  constructor(
    private apiService: ApiService
  ) { }

  /**
   * Read Property JSON file
   * Cache the data to reduce network call
   * 
   * @param endpoint URL
   * @returns Observable of SearchResults
   * 
   */
  getProperties(endpoint: string): Observable<SearchResults> {
    if (this.cache) {
      return of(this.cache);
    } else {
      return this.apiService.get<SearchResults>(endpoint).pipe(
        tap((data: SearchResults) => this.cache = data)
      );
    }
  }

  /**
   * Find the selected property from cache if available
   * 
   * @param id Selected Property ID
   * @returns Single property details from the JSON file
   * 
   */
  getPropertyById(id: string): Property | null {
    let selectedProperty: Property | null = this.cache?.SearchResults.find(item => item.PropertyId === parseFloat(id)) || null;
    return selectedProperty ? selectedProperty : null;
  }
}
