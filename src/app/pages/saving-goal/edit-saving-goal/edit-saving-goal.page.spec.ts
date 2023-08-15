import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSavingGoalPage } from './edit-saving-goal.page';

describe('EditSavingGoalPage', () => {
  let component: EditSavingGoalPage;
  let fixture: ComponentFixture<EditSavingGoalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSavingGoalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSavingGoalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
