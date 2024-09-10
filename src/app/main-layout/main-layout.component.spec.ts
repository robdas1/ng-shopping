/**
 * MainLayoutComponent Tests
 * 
 * This file contains the unit tests for the MainLayoutComponent. It leverages Angular testing utilities
 * to establish a testing module and environment tailored for the MainLayoutComponent. These tests aim to
 * confirm the successful creation and expected operation of the component. 
 * 
 * The TestBed.configureTestingModule method configures the testing module by declaring the component under test
 * and importing necessary modules. The ComponentFixture facilitates interaction with
 * the component's template and class during testing by creating an instance of the MainLayoutComponent.
 */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import { 
  Router,
  RouterModule,
  RouterOutlet, 
} from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

// Mock Router with route configuration
class MockRouter {
  config = [
    // this data forces the unit test to iterate over the router configuration
    { path: 'mock path', title: 'mock title' },
  ];
}
// Group of tests for MainLayoutComponent
describe('MainLayoutComponent', () => {

  // Declare variables for the component and its fixture
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let mockRouter: MockRouter;

  // beforeEach runs before each test case in this describe block
  beforeEach(async () => {
    mockRouter = new MockRouter();

    // Configure the testing module for this component
    await TestBed.configureTestingModule({

      imports: [

        // Importing router module to satisfy router dependencies
        RouterModule.forRoot([]),

        // Import the actual MainLayoutComponent for testing
        MainLayoutComponent,
      ],

      providers: [
        { provide: Router, useValue: mockRouter },
      ],
    })
    .overrideComponent(MainLayoutComponent, {
      set: {
        imports: [
          NgbNavModule,
          RouterOutlet
        ]
      }
    })
    .compileComponents();

    // Create a fixture for MainLayoutComponent
    fixture = TestBed.createComponent(MainLayoutComponent);

    // Get the instance of the component from the fixture
    component = fixture.componentInstance;

    // Perform initial data binding
    fixture.detectChanges();
  });

  // Test case to check if the component is created
  it('should create', () => {

    // Arrange: Component setup is already done in beforeEach
    // Act: No action needed as creation is being tested
    // Assert: Component should be truthy upon creation (it exists)
    expect(component).toBeTruthy();
  });

});