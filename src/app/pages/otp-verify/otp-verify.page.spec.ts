import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpVerifyPage } from './otp-verify.page';

describe('OtpVerifyPage', () => {
  let component: OtpVerifyPage;
  let fixture: ComponentFixture<OtpVerifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpVerifyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpVerifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
