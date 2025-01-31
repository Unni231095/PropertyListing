import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { Property } from '../../utils/property';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
  ],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.scss'
})
export class PropertyCardComponent {

  @Input() cardType: 'list' | 'grid' = 'list'
  @Input() property!: Property

  constructor(private router: Router) { }

  ngOnInit() { }

  /**
   * Handle error case
   * @param event Error event
   */
  setDefaultImage(event: Event) {
    (event.target as HTMLImageElement).src = '/assets/placeholder.png';
  }

  /**
   * Redirect to a route
   * @param path Route path
   * @param id Selected property ID
   */
  redirectTo(path: string, id: number) {
    this.router.navigate([path, id])
  }

}
