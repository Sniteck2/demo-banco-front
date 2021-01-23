import { TestBed } from '@angular/core/testing';

import { CuentaMovimientoService } from './cuenta-movimiento.service';

describe('CuentaMovimientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuentaMovimientoService = TestBed.get(CuentaMovimientoService);
    expect(service).toBeTruthy();
  });
});
