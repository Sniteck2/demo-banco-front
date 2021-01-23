import {Usuario} from "./usuario";

export class CuentaUsuario{
  id: number;
  usuarioVO: Usuario;
  monto: number;
  activo: number;
  tipoMovimiento: number;
  rutTransferir: string;

  public constructor(init?: Partial<CuentaUsuario>) {
    Object.assign(this, init as CuentaUsuario);
  }
}
