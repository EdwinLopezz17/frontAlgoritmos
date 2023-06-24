import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespaldComponent } from './respald.component';

describe('RespaldComponent', () => {
  let component: RespaldComponent;
  let fixture: ComponentFixture<RespaldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RespaldComponent]
    });
    fixture = TestBed.createComponent(RespaldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
