import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearloginComponent } from './crearlogin.component';

describe('CrearloginComponent', () => {
  let component: CrearloginComponent;
  let fixture: ComponentFixture<CrearloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
