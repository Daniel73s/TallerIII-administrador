import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarolComponent } from './asignarol.component';

describe('AsignarolComponent', () => {
  let component: AsignarolComponent;
  let fixture: ComponentFixture<AsignarolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
