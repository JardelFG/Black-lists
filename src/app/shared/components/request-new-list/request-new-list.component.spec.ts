import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestNewListComponent } from './request-new-list.component';

describe('RequestNewListComponent', () => {
  let component: RequestNewListComponent;
  let fixture: ComponentFixture<RequestNewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestNewListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestNewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
