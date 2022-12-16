import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModrolComponent } from './modrol.component';

describe('ModrolComponent', () => {
  let component: ModrolComponent;
  let fixture: ComponentFixture<ModrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
