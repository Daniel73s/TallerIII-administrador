import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprocesoComponent } from './addproceso.component';

describe('AddprocesoComponent', () => {
  let component: AddprocesoComponent;
  let fixture: ComponentFixture<AddprocesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprocesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprocesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
