import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../data-access/property.service';
import { Property } from '../../utils/property';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-property-brochure',
  standalone: true,
  imports: [
    CommonModule, 
    MatIconModule, 
    MatButtonModule
  ],
  templateUrl: './property-brochure.component.html',
  styleUrl: './property-brochure.component.scss'
})
export class PropertyBrochureComponent {

  public selectedProperty: Property | null = null

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPropertyDetails(this.route.snapshot.paramMap.get('id'))
  }

  /**
   * Property details
   * Redirect to Property Listing page is data is empty
   * 
   * @param propertyId ID passed as router param 
   */
  getPropertyDetails(propertyId: string | null) {
    if (propertyId) {
      this.selectedProperty = this.propertyService.getPropertyById(propertyId)
      if (!this.selectedProperty) {
        this.redirectTo('properties-list')
      }
    }
  }

  /**
   * Redirect to a route
   * @param path Route path
   */
  redirectTo(path: string) {
    this.router.navigate([path])
  }
}
