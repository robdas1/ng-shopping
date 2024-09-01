
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CartSummaryComponent } from './cart-summary.component';
import { selectChosenProductsState } from '../state/selectors/chosen-product.selectors';
import { ChosenProduct } from '../models/chosen-product.interface';

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