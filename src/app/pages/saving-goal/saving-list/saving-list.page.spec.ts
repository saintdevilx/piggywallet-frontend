import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingListPage } from './saving-list.page';

describe('SavingListPage', () => {
  let component: SavingListPage;
  let fixture: ComponentFixture<SavingListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
