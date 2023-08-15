import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScratchPage } from './scratch.page';

describe('ScratchPage', () => {
  let component: ScratchPage;
  let fixture: ComponentFixture<ScratchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScratchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScratchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
