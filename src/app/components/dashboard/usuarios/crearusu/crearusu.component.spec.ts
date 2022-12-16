import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearusuComponent } from './crearusu.component';

describe('CrearusuComponent', () => {
  let component: CrearusuComponent;
  let fixture: ComponentFixture<CrearusuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearusuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearusuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
