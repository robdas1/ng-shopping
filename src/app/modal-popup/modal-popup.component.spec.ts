import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplateRef } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ModalPopupComponent } from './modal-popup.component';

describe('ModalPopupComponent', () => {
  let component: ModalPopupComponent;
  let fixture: ComponentFixture<ModalPopupComponent>;
  let modalService: jasmine.SpyObj<NgbModal>;
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
    const message = 'Test Message';
    component.modalPopupNotifier = {} as TemplateRef<any>; // Mock the TemplateRef

    component.openModal(message);

    expect(component.modalMessage).toBe(message);
    expect(modalService.open).toHaveBeenCalledWith(
      component.modalPopupNotifier,
      { ariaLabelledBy: 'modal-basic-title' }
    );

    await expectAsync(modalRef.result).toBeResolved();
  });

  it('should log the dismissal reason when the modal is dismissed', async () => {
    const message = 'Test Message';
    const dismissReason = 'Dismissed by user';
    modalRef.result = Promise.reject(dismissReason); // Simulate dismissal

    spyOn(console, 'debug'); // Spy on console.debug

    component.modalPopupNotifier = {} as TemplateRef<any>; // Mock the TemplateRef
    component.openModal(message);

    try {
      await modalRef.result;
    } catch (e) {
      // Catch the rejection to prevent unhandled promise rejection
    }

    expect(console.debug).toHaveBeenCalledWith(`Dismissed: ${dismissReason}`);
  });

});