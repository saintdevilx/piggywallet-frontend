import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundPage } from './refund.page';

describe('RefundPage', () => {
  let component: RefundPage;
  let fixture: ComponentFixture<RefundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefundPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
