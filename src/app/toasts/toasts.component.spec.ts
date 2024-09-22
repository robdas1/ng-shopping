/**
 * ToastsComponent Unit Tests
 * 
 * This file contains unit tests for the ToastsComponent. The ToastsComponent is
 * only part of the toast notification system. These tests focus on the
 * ToastsComponent. The other part of the toast notification system is the ToastsService
 * and is tested separately.
 * ToastsNotification tests cover the creation of the component, the display of toasts, 
 * and the removal of toasts by request to an external service called ToastsService.
 * TODO: 
 * add mock for ToastsService and using correct syntax to do dependency injection 
 * pass the mock service 
 * to ToastsService as a constructor parameter
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastsComponent } from './toasts.component';

describe('ToastsComponent', () => {
  let component: ToastsComponent;
  let fixture: ComponentFixture<ToastsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
