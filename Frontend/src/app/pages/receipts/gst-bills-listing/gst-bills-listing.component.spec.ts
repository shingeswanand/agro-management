import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GstBillsListingComponent } from './gst-bills-listing.component';

describe('GstBillsListingComponent', () => {
  let component: GstBillsListingComponent;
  let fixture: ComponentFixture<GstBillsListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GstBillsListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GstBillsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
