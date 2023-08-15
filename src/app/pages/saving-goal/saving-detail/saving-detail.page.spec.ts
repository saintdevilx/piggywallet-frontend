import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingDetailPage } from './saving-detail.page';

describe('SavingDetailPage', () => {
  let component: SavingDetailPage;
  let fixture: ComponentFixture<SavingDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
