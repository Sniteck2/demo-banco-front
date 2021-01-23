import { TestBed } from '@angular/core/testing';

import { CuentaUsuarioService } from './cuenta-usuario.service';

describe('CuentaUsuarioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CuentaUsuarioService = TestBed.get(CuentaUsuarioService);
    expect(service).toBeTruthy();
  });
});
