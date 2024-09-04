import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPageComponent } from './start-page.component';
import { Router } from '@angular/router';

// Mock Router class
class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('StartPageComponent', () => {
  let component: StartPageComponent;
  let fixture: ComponentFixture<StartPageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartPageComponent],
      providers: [

        // Use the MockRouter class instead of the real Router service.
        { provide: Router, useClass: MockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartPageComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it ('should navigate to /stuff', () => {  
    component.navigateToStuff();
    expect(router.navigate).toHaveBeenCalledWith(['/stuff']);
  });

});
