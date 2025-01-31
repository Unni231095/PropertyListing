import { Component, ViewChild } from '@angular/core';
import { PropertyService } from '../../data-access/property.service';
import { Property } from '../../utils/property';
import { SearchResults } from '../../utils/search-results';
import { PropertyCardComponent } from '../../ui/property-card/property-card.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-properties-list',
  standalone: true,
  imports: [
    CommonModule,
    PropertyCardComponent,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSliderModule,
    MatPaginatorModule,
    MatButtonToggleModule
  ],
  templateUrl: './properties-list.component.html',
  styleUrl: './properties-list.component.scss'
})
export class PropertiesListComponent {

  private pageSize: number = 10;
  private currentPage: number = 0;
  public propertiesList: Property[] = []
  public filteredProperties: Property[] = []
  public sortOrder: string = 'asc'
  public minPrice!: number;
  public maxPrice!: number;
  public paginatedProperties: Property[] = [];
  public cardView: 'list' | 'grid' = 'list'
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.getPropertiesList()
  }

  /**
   * Fetch all properties
   */
  getPropertiesList() {
    this.propertyService.getProperties('property_data.json').subscribe({
      next: (response: SearchResults) => {
        this.propertiesList = response.SearchResults
        this.filteredProperties = [...this.propertiesList]
        this.findMinAndMaxPrices()
        if (this.propertiesList.length) {
          this.sortProperties()
        }
        this.updatePaginatedProperties();
      },
      error: (error) => {
        console.log('Error loading data: ' + error.message);
      }
    });
  }

  /**
   * Sort properties in asc or dsc based on selection
   * Initial sorting order is asc
   */
  sortProperties() {
    this.filteredProperties.sort((a, b) => {
      const priceA = parseFloat(a.PriceAsString.replace(/[^\d.-]/g, ''));
      const priceB = parseFloat(b.PriceAsString.replace(/[^\d.-]/g, ''));
      return this.sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });
    this.updatePaginatedProperties();
  }

  /**
   * Filter properties based on Min and Max price
   */
  filterProperties() {
    this.filteredProperties = this.propertiesList.filter(property => {
      const price = parseFloat(property.PriceAsString.replace(/[^\d.-]/g, ''));

      return (
        (this.minPrice === null || price >= this.minPrice) &&
        (this.maxPrice === null || price <= this.maxPrice)
      );
    });
    this.paginator.firstPage();
    this.updatePaginatedProperties();
  }

  /**
   * Interaction with Paginator
   * @param event Page event
   */
  onPaginate(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedProperties();
  }

  /**
   * Updates all page properties and data
   */
  updatePaginatedProperties() {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProperties = this.filteredProperties.slice(startIndex, endIndex);
  }

  /**
   * Find the Min and Max price from the Properties list
   */
  findMinAndMaxPrices() {
    const min = this.propertiesList.reduce((prev, current) => (parseFloat(prev.PriceAsString.replace(/[^\d.-]/g, '')) < parseFloat(current.PriceAsString.replace(/[^\d.-]/g, ''))) ? prev : current);
    this.minPrice = parseFloat(min.PriceAsString.replace(/[^\d.-]/g, ''))
    const max = this.propertiesList.reduce((prev, current) => (parseFloat(prev.PriceAsString.replace(/[^\d.-]/g, '')) > parseFloat(current.PriceAsString.replace(/[^\d.-]/g, ''))) ? prev : current);
    this.maxPrice = parseFloat(max.PriceAsString.replace(/[^\d.-]/g, ''))
  }

}
