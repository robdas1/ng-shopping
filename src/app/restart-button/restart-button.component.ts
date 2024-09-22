/**
 * Restart Button
 * 
 * This component providesthe user with a button to restart the application. 
 * It uses the modal-confirmation component to confirm the user's intention to restart the application.
 */
import { Component, ViewChild } from '@angular/core';
import { ModalConfirmationComponent } from '../modal-confirmation/modal-confirmation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restart-button',
  standalone: true,
  imports: [ModalConfirmationComponent],
  templateUrl: './restart-button.component.html',
  styleUrl: './restart-button.component.css'
})
export class RestartButtonComponent {

  // Reference to the ModalConfirmationComponent
  @ViewChild(ModalConfirmationComponent) modalComponent!: ModalConfirmationComponent;

  constructor(private router: Router) {}

  // Function to handle the restart button click
  onRestart(): void {
    this.modalComponent.openModalConfirmation('Are you sure you want to start again? (cart will be empty)');
  }

  // Function to handle the confirmation of restart
  yesRestart(): void {
    console.debug('inside RestartButtonComponent.yesRestart()');
    this.router.navigate(['/start']);
  }

  // Function to handle the cancellation of restart
  noRestart(): void {
    console.debug('inside RestartButtonComponent.noRestart()');
  }
}
