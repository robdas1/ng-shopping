/**
 * Restart Button unit tests
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestartButtonComponent } from './restart-button.component';
import { Router, RouterModule } from '@angular/router';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// Mock 
@Component({
  selector: 'app-modal-confirmation',
  standalone: true,
  template: ''
})
class MockModalConfirmationComponent {
  @Input() onYes!: () => void;
  @Input() onNo!: () => void;

  modalMessage = '';
  openModalConfirmation(message: string) {
    this.modalMessage = message;
    console.debug('MockModalConfirmationComponent openModalConfirmation with message:', message);
  }
}

// Mock  
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('RestartButtonComponent', () => {
  let mockRouter: MockRouter;
  let component: RestartButtonComponent;
  let fixture: ComponentFixture<RestartButtonComponent>;

  beforeEach(async () => {
    mockRouter = new MockRouter();

    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot([]),
        RestartButtonComponent
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: MockModalConfirmationComponent, useClass: MockModalConfirmationComponent },
      ]

    })
      // We need to override the component to include the MockModalConfirmationComponent
      // and other required imports have to be included otherwise overrideComponent will not import them
      .overrideComponent(RestartButtonComponent, {
        set: {
          imports: [
            MockModalConfirmationComponent,
            RestartButtonComponent,
            CommonModule,
          ]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(RestartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log the title when noRestart is called', () => {

    spyOn(console, 'debug');
    component.noRestart();
    expect(console.debug).toHaveBeenCalled();
  });

  it('should log the title and navigate to /start when yesRestart is called', () => {
    spyOn(console, 'debug');
    component.yesRestart();
    expect(console.debug).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/start']);
  });

  it('should open modal confirmation with the correct message when onRestart is called', () => {

    // Arrange: create and setup a mock modal component.
    // Since the modal component is a ViewChild, we need to get it from the fixture.
    const mockModalComponent = fixture.debugElement.injector.get(MockModalConfirmationComponent);
    spyOn(mockModalComponent, 'openModalConfirmation');

    // Add the mockModalComponent to the component.
    // Linter override: there is an issue with the mockModalComponent type, so we need to cast it to any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component.modalComponent = mockModalComponent as any;

    // Act: call onRestart method
    component.onRestart();

    // Assert: verify if the openModalConfirmation method was called with the correct message
    expect(mockModalComponent.openModalConfirmation).toHaveBeenCalledWith('Are you sure you want to start again? (cart will be empty)');
  });

});
