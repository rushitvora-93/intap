import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchProfileComponent } from './fetch-profile.component';

describe('FetchProfileComponent', () => {
  let component: FetchProfileComponent;
  let fixture: ComponentFixture<FetchProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
