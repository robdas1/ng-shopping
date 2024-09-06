/**
 * ModalNotificationComponent
 * 
 * A component that displays a modal popup notification message. 
 */
import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-notification-popup',
  standalone: true,
  imports: [],
  templateUrl: './modal-notification.component.html',
  styleUrl: './modal-notification.component.css'
})
export class ModalNotificationComponent {

  // Reference to the modal in the component template
  @ViewChild('modalPopupNotifier', { static: true }) modalPopupNotifier!: TemplateRef<unknown>;
  modalMessage = '';

  constructor(private modalService: NgbModal) { }

  /**
   * Opens a modal popup with the provided message.
   * @param message The message to display in the modal popup.
   */
  openModalNotification(message: string) {
    this.modalMessage = message;
    this.modalService.open(
        this.modalPopupNotifier, 
        { ariaLabelledBy: 'modal-notification-basic-title' }
      ).result.then(
      (result) => { console.debug(`Closed: ${result}`); },
      (reason) => { console.debug(`Dismissed: ${reason}`); }
    );
  }

}
