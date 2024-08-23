/**
 * ModalPopupComponent
 * 
 * A component that displays a modal popup with a message. 
 */
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-popup',
  standalone: true,
  imports: [],
  templateUrl: './modal-popup.component.html',
  styleUrl: './modal-popup.component.css'
})
export class ModalPopupComponent {

  // Reference to the modal in the component template
  @ViewChild('modalPopupNotifier', { static: true }) modalPopupNotifier!: TemplateRef<any>;
  modalMessage: string = '';

  constructor(private modalService: NgbModal) { }

  /**
   * Opens a modal popup with the provided message.
   * @param message The message to display in the modal popup.
   */
  openModal(message: string) {
    this.modalMessage = message;
    this.modalService.open(
        this.modalPopupNotifier, 
        { ariaLabelledBy: 'modal-basic-title' }
      ).result.then(
      (result) => { console.debug(`Closed: ${result}`); },
      (reason) => { console.debug(`Dismissed: ${reason}`); }
    );
  }
}
