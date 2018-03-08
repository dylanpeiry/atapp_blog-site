import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RteComponent } from './rte.component';

describe('RteComponent', () => {
  let component: RteComponent;
  let fixture: ComponentFixture<RteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
