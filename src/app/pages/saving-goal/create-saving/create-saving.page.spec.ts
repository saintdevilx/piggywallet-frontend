import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSavingPage } from './create-saving.page';

describe('CreateSavingPage', () => {
  let component: CreateSavingPage;
  let fixture: ComponentFixture<CreateSavingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSavingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSavingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
