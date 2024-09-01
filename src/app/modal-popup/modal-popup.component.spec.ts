/**
 * ModalPopupComponent Unit Tests
 * 
 * This file contains the unit tests for the ModalPopupComponent. It leverages Angular testing utilities
 * to establish a testing module and environment tailored for the ModalPopupComponent. These tests aim to 
 * confirm the successful creation and expected operation of the component.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ModalPopupComponent } from './modal-popup.component';

// Group of tests for ModalPopupComponent
describe('ModalPopupComponent', () => {

  // Declare variables for the component, its fixture, and the modal service
  let component: ModalPopupComponent;
  let fixture: ComponentFixture<ModalPopupComponent>;

  // The modal service provides the open method to create a modal popup in the component.
  let modalService: jasmine.SpyObj<NgbModal>;

  // Declare a variable for the modal reference
  let modalRef: jasmine.SpyObj<NgbModalRef>;

  beforeEach(async () => {

    modalRef = jasmine.createSpyObj('NgbModalRef', ['result']);
    modalRef.result = Promise.resolve('Closed');

    modalService = jasmine.createSpyObj('NgbModal', ['open']);
    modalService.open.and.returnValue(modalRef);

    await TestBed.configureTestingModule({
      imports: [ModalPopupComponent],
      providers: [
        { provide: NgbModal, useValue: modalService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ModalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal with the provided message', async () => {

    // Arrange - Set up the component and message
    const message = 'Test Message';
    component.modalPopupNotifier = {} as TemplateRef<unknown>; // Mock the TemplateRef

    // Act - Open the modal with the message
    component.openModal(message);

    // Assert 
    // Ensure the modal is opened with the correct message
    expect(component.modalMessage).toBe(message);

    // Ensure the modal service open method was called with the correct arguments
    expect(modalService.open).toHaveBeenCalledWith(
      component.modalPopupNotifier,
      { ariaLabelledBy: 'modal-basic-title' }
    );

    // Ensure the modal result promise is resolved
    await expectAsync(modalRef.result).toBeResolved();
  });

  it('should log the dismissal reason when the modal is dismissed', async () => {

    // Arrange - Set up the test with a message and dismiss reason
    const message = 'Test Message';
    const dismissReason = 'Dismissed by user';
    spyOn(console, 'debug');
    component.modalPopupNotifier = {} as TemplateRef<unknown>; // Mock the TemplateRef

    // Act - Open the modal and reject the result promise to simulate dismissal
    modalRef.result = Promise.reject(dismissReason);
    component.openModal(message);

    // Catch the rejection to prevent unhandled promise rejection
    try {
      await modalRef.result;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e: unknown) {
      // Intentionally empty
    }


    // Assert - Ensure the dismiss reason is logged
    expect(console.debug).toHaveBeenCalledWith(`Dismissed: ${dismissReason}`);
  });

});