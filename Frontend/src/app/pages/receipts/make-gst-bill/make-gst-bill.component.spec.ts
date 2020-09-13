import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeGstBillComponent } from './make-gst-bill.component';

describe('MakeGstBillComponent', () => {
  let component: MakeGstBillComponent;
  let fixture: ComponentFixture<MakeGstBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeGstBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeGstBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
