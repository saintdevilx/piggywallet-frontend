import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletePage } from './complete.page';

describe('CompletePage', () => {
  let component: CompletePage;
  let fixture: ComponentFixture<CompletePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
