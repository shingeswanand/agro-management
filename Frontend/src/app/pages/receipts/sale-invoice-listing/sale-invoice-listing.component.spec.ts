import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleInvoiceListingComponent } from './sale-invoice-listing.component';

describe('SaleInvoiceListingComponent', () => {
  let component: SaleInvoiceListingComponent;
  let fixture: ComponentFixture<SaleInvoiceListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleInvoiceListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleInvoiceListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
