import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfovetComponent } from './infovet.component';

describe('InfovetComponent', () => {
  let component: InfovetComponent;
  let fixture: ComponentFixture<InfovetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfovetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfovetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
