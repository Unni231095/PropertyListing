import { CommonModule } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-gallery-popup',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './gallery-popup.component.html',
  styleUrl: './gallery-popup.component.scss'
})
export class GalleryPopupComponent {

  public currentIndex: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { images: string[], index: number },
    private dialogRef: MatDialogRef<GalleryPopupComponent>
  ) {
    this.currentIndex = data.index;
  }

  /**
   * Handle left and right arrow click to navigate images
   * @param event Keyboard event
   */
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.prevImage();
    } else if (event.key === 'ArrowRight') {
      this.nextImage();
    }
  }

  /**
   * Load next image
   */
  nextImage(): void {
    if (this.currentIndex < this.data.images.length - 1) {
      this.currentIndex++;
      this.scrollActiveThumbnailIntoView();
    }
  }

  /**
   * Load prev image
   */
  prevImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.scrollActiveThumbnailIntoView();
    }
  }

  /**
   * Load image from Thumbnail
   * @param index Image index
   */
  setImage(index: number): void {
    this.currentIndex = index;
  }

  /**
   * Close dialog container
   */
  close(): void {
    this.dialogRef.close();
  }

  /**
   * Scroll the thumbnail upon clicking Next and Prev button
   */
  scrollActiveThumbnailIntoView(): void {
    setTimeout(() => {
      const activeThumbnail = document.querySelector('.thumbnail.active');
      if (activeThumbnail) {
        activeThumbnail.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }, 50); 
  }

  /**
   * Handle error for image loading
   * @param event Error event
   */
  setDefaultImage(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/placeholder.png';
  }


}
