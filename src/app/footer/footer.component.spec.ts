/**
 * FooterComponent Unit Tests
 * 
 * This file contains unit tests for the FooterComponent. The purpose of these tests is to ensure
 * that the FooterComponent behaves as expected. Unit tests are a crucial part of the development
 * process as they help catch bugs early and ensure that individual components work correctly in
 * isolation. The tests in this file use Angular's testing utilities to create a testing module,
 * compile the component, and verify its creation.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
