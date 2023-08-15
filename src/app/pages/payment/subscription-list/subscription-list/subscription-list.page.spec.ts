import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionListPage } from './subscription-list.page';

describe('SubscriptionListPage', () => {
  let component: SubscriptionListPage;
  let fixture: ComponentFixture<SubscriptionListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscriptionListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriptionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
