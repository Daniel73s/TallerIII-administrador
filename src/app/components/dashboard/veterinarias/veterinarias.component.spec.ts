import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinariasComponent } from './veterinarias.component';

describe('VeterinariasComponent', () => {
  let component: VeterinariasComponent;
  let fixture: ComponentFixture<VeterinariasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeterinariasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeterinariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
