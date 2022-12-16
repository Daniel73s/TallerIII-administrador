import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionvetComponent } from './ubicacionvet.component';

describe('UbicacionvetComponent', () => {
  let component: UbicacionvetComponent;
  let fixture: ComponentFixture<UbicacionvetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UbicacionvetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UbicacionvetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
