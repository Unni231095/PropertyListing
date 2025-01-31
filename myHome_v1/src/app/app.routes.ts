import { Routes } from '@angular/router';
import { PropertiesListComponent } from './properties/feature/properties-list/properties-list.component';
import { PropertyBrochureComponent } from './properties/feature/property-brochure/property-brochure.component';
import { PropertyGalleryComponent } from './properties/feature/property-gallery/property-gallery.component';

export const routes: Routes = [
    { path: '', redirectTo: 'properties-list', pathMatch: 'full' },
    { path: 'properties-list', component: PropertiesListComponent },
    { path: 'property-gallery/:id', component: PropertyGalleryComponent },
    { path: 'property-brochure/:id', component: PropertyBrochureComponent }
];
