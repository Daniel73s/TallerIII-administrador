import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModclaveComponent } from './modclave.component';

describe('ModclaveComponent', () => {
  let component: ModclaveComponent;
  let fixture: ComponentFixture<ModclaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModclaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModclaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
