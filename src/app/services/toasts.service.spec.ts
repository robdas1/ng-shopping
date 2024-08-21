import { TestBed } from '@angular/core/testing';

import { Toast, ToastsService } from './toasts.service';

describe('ToastsService', () => {
  let service: ToastsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a toast when show is called', () => {
    const message = 'Test message';
    const options: Partial<Toast> = { classname: 'test-class', delay: 3000 };
    service.show(message, options);

    expect(service.toasts.length).toBe(1);
    expect(service.toasts[0].message).toBe(message);
    expect(service.toasts[0].classname).toBe(options.classname);
    expect(service.toasts[0].delay).toBe(options.delay);
  });

  it('should remove a toast when remove is called', () => {
    const toast: Toast = { message: 'Test message', classname: 'test-class', delay: 3000 };
    service.toasts.push(toast);

    service.remove(toast);

    expect(service.toasts.length).toBe(0);
  });


});
