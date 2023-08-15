import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterPaymentPage } from './after-payment.page';

describe('AfterPaymentPage', () => {
  let component: AfterPaymentPage;
  let fixture: ComponentFixture<AfterPaymentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterPaymentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
