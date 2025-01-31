import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyBrochureComponent } from './property-brochure.component';

describe('PropertyBrochureComponent', () => {
  let component: PropertyBrochureComponent;
  let fixture: ComponentFixture<PropertyBrochureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyBrochureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyBrochureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
