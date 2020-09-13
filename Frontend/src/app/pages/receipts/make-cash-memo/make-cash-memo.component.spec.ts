import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeCashMemoComponent } from './make-cash-memo.component';

describe('MakeCashMemoComponent', () => {
  let component: MakeCashMemoComponent;
  let fixture: ComponentFixture<MakeCashMemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeCashMemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeCashMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
