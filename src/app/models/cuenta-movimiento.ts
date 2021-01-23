import {CuentaUsuario} from "./cuenta-usuario";

export class CuentaMovimiento{
  id: number;
  cuentaUsuario: CuentaUsuario;
  tipoMovimiento: number;
  desde: string;
  hasta: string;
  montoMovimiento: number;
  montoRestante: number;
  fechaMovimiento: Date;
  nombreMovimiento: string;

  public constructor(init?: Partial<CuentaMovimiento>) {
    Object.assign(this, init as CuentaMovimiento);
  }
}
