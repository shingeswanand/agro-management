import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashMemoListingComponent } from './cash-memo-listing.component';

describe('CashMemoListingComponent', () => {
  let component: CashMemoListingComponent;
  let fixture: ComponentFixture<CashMemoListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashMemoListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashMemoListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
