export class Usuario{
  id: number;
  nombre: string;
  appPaterno: string;
  appMaterno: string;
  rut: number;
  correo: string;
  password: string;
  activo: number;

  public constructor(init?: Partial<Usuario>) {
    Object.assign(this, init as Usuario);
  }
}
