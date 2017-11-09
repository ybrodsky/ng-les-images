import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LesImageComponent } from './les-image.component';

describe('LesImageComponent', () => {
  let component: LesImageComponent;
  let fixture: ComponentFixture<LesImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LesImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LesImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
