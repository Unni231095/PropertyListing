import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../../data-access/property.service';
import { GalleryPopupComponent } from '../../ui/gallery-popup/gallery-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-property-gallery',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './property-gallery.component.html',
  styleUrl: './property-gallery.component.scss'
})
export class PropertyGalleryComponent {

  public selectedPropertyPhotos: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getPropertyPhotos(this.route.snapshot.paramMap.get('id'))
  }

  /**
   * Get property images
   * Redirect to Property Listing page is data is empty
   * Insert placeholder image to keep consistency
   *
   * @param propertyId Selected property
   */
  getPropertyPhotos(propertyId: string | null) {
    if (propertyId) {
      let selectedProperty = this.propertyService.getPropertyById(propertyId)
      if (!selectedProperty) {
        this.redirectTo('properties-list')
      } else {
        this.selectedPropertyPhotos = selectedProperty.Photos
        if (this.selectedPropertyPhotos.length < 7) {
          while (this.selectedPropertyPhotos.length < 7) {
            this.selectedPropertyPhotos.push('assets/placeholder.png');
          }
        }
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

  /**
   * Open gallery popup with the selected image
   * @param image Index of the selected image
   */
  openDialog(image: number): void {
    if (this.selectedPropertyPhotos[image] != 'assets/placeholder.png') {
      this.dialog.open(GalleryPopupComponent, {
        data: { images: this.selectedPropertyPhotos, index: image },
        width: '90vw',
        height: '90vh',
        maxWidth: 'none'
      });
    }
  }

  /**
   * Handle error for image
   * @param event Error event
   */
  setDefaultImage(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/placeholder.png';
  }

}
