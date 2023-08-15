import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AspirationDetailPage } from './aspiration-detail.page';

describe('AspirationDetailPage', () => {
  let component: AspirationDetailPage;
  let fixture: ComponentFixture<AspirationDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AspirationDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AspirationDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
