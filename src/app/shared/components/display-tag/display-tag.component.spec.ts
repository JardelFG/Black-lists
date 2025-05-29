import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTagComponent } from './display-tag.component';

describe('DisplayTagComponent', () => {
  let component: DisplayTagComponent;
  let fixture: ComponentFixture<DisplayTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisplayTagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
