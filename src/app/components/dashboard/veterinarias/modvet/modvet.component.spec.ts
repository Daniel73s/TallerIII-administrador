import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModvetComponent } from './modvet.component';

describe('ModvetComponent', () => {
  let component: ModvetComponent;
  let fixture: ComponentFixture<ModvetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModvetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModvetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
