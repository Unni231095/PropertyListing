import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryPopupComponent } from './gallery-popup.component';

describe('GalleryPopupComponent', () => {
  let component: GalleryPopupComponent;
  let fixture: ComponentFixture<GalleryPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
