import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrolComponent } from './addrol.component';

describe('AddrolComponent', () => {
  let component: AddrolComponent;
  let fixture: ComponentFixture<AddrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
