import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompatiblePhonesComponent } from './compatible-phones.component';

describe('CompatiblePhonesComponent', () => {
  let component: CompatiblePhonesComponent;
  let fixture: ComponentFixture<CompatiblePhonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompatiblePhonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompatiblePhonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
