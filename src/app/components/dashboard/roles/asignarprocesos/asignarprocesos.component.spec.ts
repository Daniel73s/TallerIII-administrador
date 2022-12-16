import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarprocesosComponent } from './asignarprocesos.component';

describe('AsignarprocesosComponent', () => {
  let component: AsignarprocesosComponent;
  let fixture: ComponentFixture<AsignarprocesosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarprocesosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarprocesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
