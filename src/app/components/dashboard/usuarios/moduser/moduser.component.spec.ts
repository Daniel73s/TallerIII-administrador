import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuserComponent } from './moduser.component';

describe('ModuserComponent', () => {
  let component: ModuserComponent;
  let fixture: ComponentFixture<ModuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
