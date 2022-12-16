import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpervetComponent } from './addpervet.component';

describe('AddpervetComponent', () => {
  let component: AddpervetComponent;
  let fixture: ComponentFixture<AddpervetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpervetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpervetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
