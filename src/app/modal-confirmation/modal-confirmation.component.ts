/**
 * ModalConfirmationComponent
 * 
 * A component that displays a modal popup message and obtains confirmation 
 * from the user.  This component requires two functions, `onYes` and `onNo`, 
 * to be passed in as input properties.  These functions will be executed when 
 * the user clicks the 'Yes' or 'No' buttons, respectively.  
 * Example usage in the containing component:
 * 
 * <app-modal-confirmation 
 *  [onYes]="yesLogic.bind(this)" 
 *  [onNo]="nologic.bind(this)">
 * </app-modal-confirmation>
 * 
 * The `.bind(this)` syntax is used to bind the functions to the calling 
 * component's scope. This ensures that when the functions are executed within 
 * the ModalConfirmationComponent, they have access to the variables and methods 
 * defined in the calling component.
 * 
 * More information on `.bind(this)` can be found here:
 * - MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
 * - JavaScript Info: https://javascript.info/bind
*/
import { Component, ViewChild, TemplateRef, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './modal-confirmation.component.html',
  styleUrl: './modal-confirmation.component.css'
})
export class ModalConfirmationComponent {

  // Reference to the modal in the component template
  @ViewChild('modalPopupConfirm', { static: true }) modalPopupConfirm!: TemplateRef<unknown>;
  modalMessage = '';

  // Input properties for the functions to be executed on 'Yes' and 'No' button clicks
  @Input() onYes!: () => void;  
  @Input() onNo!: () => void;   

  constructor(private modalService: NgbModal) { }

  /**
   * Opens a modal popup with the provided message.
   * @param message The message to display in the modal popup.
   */
  openModalConfirmation(message: string) {
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
