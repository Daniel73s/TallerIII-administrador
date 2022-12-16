import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearvetComponent } from './crearvet.component';

describe('CrearvetComponent', () => {
  let component: CrearvetComponent;
  let fixture: ComponentFixture<CrearvetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearvetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearvetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
