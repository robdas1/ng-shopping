/**
 * ModalConfirmationComponent
 * 
 * A component that displays a modal popup message and obtain confirmation. 
 */
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-popup',
  standalone: true,
  imports: [],
  templateUrl: './modal-confirmation.component.html',
  styleUrl: './modal-confirmation.component.css'
})
export class ModalConfirmationComponent {

  // Reference to the modal in the component template
  @ViewChild('modalPopupConfirm', { static: true }) modalPopupConfirm!: TemplateRef<unknown>;
  modalMessage = '';

  constructor(private modalService: NgbModal) { }

  /**
   * Opens a modal popup with the provided message.
   * @param message The message to display in the modal popup.
   */
  openModalConfirmation(message: string) {
    console.debug(`openModalConfirmation: ${message}`);
    this.modalMessage = message;
    this.modalService.open(
        this.modalPopupConfirm, 
        { ariaLabelledBy: 'modal-confirmation-basic-title' }
      ).result.then(
      (result) => { console.debug(`Closed: ${result}`); },
      (reason) => { console.debug(`Dismissed: ${reason}`); }
    );
  }
}
