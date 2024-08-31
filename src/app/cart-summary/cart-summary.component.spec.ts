// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CartSummaryComponent } from './cart-summary.component';

// describe('CartSummaryComponent', () => {
//   let component: CartSummaryComponent;
//   let fixture: ComponentFixture<CartSummaryComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [CartSummaryComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(CartSummaryComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   fit('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
//-----------------------------------

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { CartSummaryComponent } from './cart-summary.component';
// import { Store } from '@ngrx/store';
// import { of } from 'rxjs';
// import { ChosenProduct } from '../models/chosen-product.interface';
// import { selectChosenProductsState } from '../state/selectors/chosen-product.selectors';

// // Mock data for testing
// const mockChosenProducts: ChosenProduct[] = [
//   {
//     id: "1", productName: 'Product 1', qty: 2,
//     unitPrice: 0
//   },
//   {
//     id: "2", productName: 'Product 2', qty: 3,
//     unitPrice: 0
//   }
// ];

// // Mock Store service
// class MockStore {
//   dispatch = jasmine.createSpy('dispatch');
//   select = jasmine.createSpy('select').and.callFake(selector => {
//     if (selector === selectChosenProductsState) {
//       return of(mockChosenProducts);
//     }
//     return of([]);
//   });
// }

// describe('CartSummaryComponent', () => {
//   let component: CartSummaryComponent;
//   let fixture: ComponentFixture<CartSummaryComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [CartSummaryComponent],
//       providers: [
//         { provide: Store, useClass: MockStore }
//       ]
//     }).compileComponents();

//     fixture = TestBed.createComponent(CartSummaryComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   fit('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   fit('should calculate total items correctly', () => {
//     expect(component.totalItems).toBe(5); // 2 + 3 from mockChosenProducts
//   });
// });
//-----------------------------------

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CartSummaryComponent } from './cart-summary.component';
import { selectChosenProductsState } from '../state/selectors/chosen-product.selectors';
import { ChosenProduct } from '../models/chosen-product.interface';
import { of } from 'rxjs';

describe('CartSummaryComponent', () => {
  let component: CartSummaryComponent;
  let fixture: ComponentFixture<CartSummaryComponent>;
  let store: MockStore;
  const initialState = { chosenProducts: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSummaryComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(CartSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total items correctly', () => {
    const mockProducts: ChosenProduct[] = [
      { id: "1", productName: 'Product 1', qty: 2, unitPrice: 10 },
      { id: "2", productName: 'Product 2', qty: 3, unitPrice: 20 }
    ];
    store.overrideSelector(selectChosenProductsState, mockProducts);
    store.refreshState();
    fixture.detectChanges();

    expect(component.totalItems).toBe(5);
  });
});