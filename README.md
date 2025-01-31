# Property Listings

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Functionality overview

- Properties List(URL: /properties-list )
    - List of properties
        - Main image
        - Price
        - Address
        - Features - Beds and Bath
        - Agent Logo
    - Sort with price in ASC or DSC
    - Filter with price by entering minimum and maximum price
    - Pagination for properties. Displays 10 properties in 1 page 
    - View Brochure
    - View Gallery
- Property Brochure(URL: /property-brochure/:id)
    - JSON data of the property
    - Back button: Navigates to Properties List
- Property Gallery(URL: /property-gallery/:id)
    - Displays all images of the property in a Grid system
    - Image Gallery
        - Navigate through all images

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
