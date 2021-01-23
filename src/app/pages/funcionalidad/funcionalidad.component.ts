import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CuentaUsuarioService} from "../../services/cuenta-usuario.service";
import {Usuario} from "../../models/usuario";
import Swal from "sweetalert2";
import {CuentaUsuario} from "../../models/cuenta-usuario";
import {Subject} from "rxjs";
import {DataTableDirective} from "angular-datatables";
import {CuentaMovimientoService} from "../../services/cuenta-movimiento.service";
import {CuentaMovimiento} from "../../models/cuenta-movimiento";
import {UsuarioService} from "../../services/usuario.service";

@Component({
  selector: 'app-funcionalidad',
  templateUrl: './funcionalidad.component.html',
  styleUrls: ['./funcionalidad.component.scss']
})
export class FuncionalidadComponent implements OnInit, OnDestroy {

  @ViewChild(DataTableDirective, {read: false, static: false})
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  public montoDisponible: number;
  public montoIngreso: number;
  public montoRetiro: number;
  public montoTransferir: number;
  public rut: string;
  public rutUsuario: number;
  public idCuentaUsuario: number;
  public transacciones: CuentaMovimiento[] = [];
  private idUsuario: number;

  constructor(private cuentaUsuarioService: CuentaUsuarioService,
              private cuentaMovimientoService: CuentaMovimientoService,
              private usuarioService: UsuarioService) {
  }

  ngOnInit() {
    const data = JSON.parse(sessionStorage.getItem('UsuarioLogin'));
    this.idUsuario = data.id;
    this.rutUsuario = data.rut;
    this.buscarCuenta();
    this.dtOptions = {
      pageLength: 10,
      paging: true,
      language: {
        processing: "Procesando...",
        search: "Buscar:",
        lengthMenu: "Mostrar _MENU_ transacciones",
        infoEmpty: "Mostrando ningúna transaccion",
        infoFiltered: "(filtrado _MAX_ elementos total)",
        info: "Mostrando _START_ a _END_ de _TOTAL_ transacciones",
        loadingRecords: "Cargando registros...",
        zeroRecords: "No se encontraron registros",
        emptyTable: "No hay datos disponibles en la tabla",
        paginate: {
          first: "Primero",
          previous: "Anterior",
          next: "Siguiente",
          last: "Último"
        },
        aria: {
          sortAscending: ": Activar para ordenar la tabla en orden ascendente",
          sortDescending: ": Activar para ordenar la tabla en orden descendente"
        }
      }
    };
  }

  public buscarCuenta(): void {
    let usuario: Usuario = new Usuario();
    usuario.id = this.idUsuario
    this.cuentaUsuarioService.buscarCuenta(usuario).subscribe(data => {
      if (data) {
        this.idCuentaUsuario = data.id;
        this.montoDisponible = data.monto;
        this.listarTransacciones();
      }
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'Reintente más tarde',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    })
  }

  public agregarFondos(tipoMovimiento: number): void {
    let tipMov: string;
    if (this.montoIngreso > 0 || this.montoRetiro > 0) {
      if ((this.montoDisponible - this.montoRetiro) < 0 || (this.montoRetiro - this.montoTransferir) < 0) {
        Swal.fire({
          title: 'Error',
          text: 'No puede quedar con saldo negativo en la cuenta',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      } else {
        if (tipoMovimiento == 1) {
          tipMov = "agregado fondos";
        } else {
          tipMov = "retirado fondos";
        }
        let cuentaUsuario: CuentaUsuario = this.crearCuentaUsuario(tipoMovimiento);
        this.cuentaUsuarioService.modificarCuenta(cuentaUsuario).subscribe(data => {
          if (data.id != -1) {
            Swal.fire({
              title: 'Exito',
              text: 'Se han ' + tipMov + ' con éxito',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.buscarCuenta();
          }
        });
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Monto debe ser mayor a 0',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  public transferencia(tipoMovimiento: number): void{
    if(this.montoTransferir > 0){
      if(this.rut != undefined){
        this.usuarioService.buscarPorRut(this.rut).subscribe(data => {
          if(data.id != -1){
            let cuentaUsuario: CuentaUsuario = this.crearCuentaUsuario(tipoMovimiento);
            this.cuentaUsuarioService.modificarCuenta(cuentaUsuario).subscribe( data =>{
              if (data.id != -1) {
                Swal.fire({
                  title: 'Exito',
                  text: 'La transferencia se ha hecho con exito',
                  icon: 'success',
                  confirmButtonText: 'Aceptar'
                });
                this.buscarCuenta();
              }
            })
          }else{
            Swal.fire({
              title: 'Error',
              text: 'El rut al cual se desea transferir no existe en el sistema',
              icon: 'warning',
              confirmButtonText: 'Aceptar'
            });
          }
        }, error => {
          Swal.fire({
            title: 'Error',
            text: 'Reintente mas tarde',
            icon: 'warning',
            confirmButtonText: 'Aceptar'
          });
        })
      }else{
        Swal.fire({
          title: 'Error',
          text: 'Debe contener un rut para transferir',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'El monto a transferir debe ser mayor a 0',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  public listarTransacciones(): void {
    let cuentaUsuario: CuentaUsuario = new CuentaUsuario();
    cuentaUsuario.id = this.idCuentaUsuario;
    this.cuentaMovimientoService.listarMovimiento(cuentaUsuario).subscribe(data => {
      this.transacciones = [];
      if (data.length > 0) {
        data.forEach(tr => {
          let cuentaMovimiento: CuentaMovimiento = new CuentaMovimiento();
          cuentaMovimiento.id = tr.id;
          if (tr.tipoMovimiento == 1) {
            cuentaMovimiento.nombreMovimiento = "Agrega saldo";
            cuentaMovimiento.montoMovimiento = tr.montoMovimiento;
          } else if (tr.tipoMovimiento == 2) {
            cuentaMovimiento.nombreMovimiento = "Retira saldo";
            cuentaMovimiento.montoMovimiento = tr.montoMovimiento * -1;
          } else if (tr.tipoMovimiento == 3) {
            cuentaMovimiento.nombreMovimiento = "Transferencia saliente";
            cuentaMovimiento.montoMovimiento = tr.montoMovimiento * -1;
          } else if (tr.tipoMovimiento == 4) {
            cuentaMovimiento.nombreMovimiento = "Transferencia entrante";
            cuentaMovimiento.montoMovimiento = tr.montoMovimiento;
          }
          cuentaMovimiento.fechaMovimiento = tr.fechaMovimiento;
          cuentaMovimiento.desde = tr.desde;
          cuentaMovimiento.hasta = tr.hasta;
          cuentaMovimiento.montoRestante = tr.montoRestante;
          this.transacciones.push(cuentaMovimiento);
        });
        this.renderizarDatatable();
      }
    }, error => {
      Swal.fire({
        title: 'Error',
        text: 'Reintente mas tarde',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  private crearCuentaUsuario(tipoMovimiento: number): CuentaUsuario {
    let cuentaUsuario: CuentaUsuario = new CuentaUsuario();
    let usuario: Usuario = new Usuario();
    usuario.id = this.idUsuario;
    usuario.rut = this.rutUsuario;
    cuentaUsuario.usuarioVO = usuario;
    cuentaUsuario.tipoMovimiento = tipoMovimiento;
    if (tipoMovimiento == 1) {
      cuentaUsuario.monto = this.montoIngreso;
    } else if (tipoMovimiento == 2) {
      cuentaUsuario.monto = this.montoRetiro;
    } else {
      cuentaUsuario.monto = this.montoTransferir;
      cuentaUsuario.rutTransferir = this.rut;
    }
    return cuentaUsuario;
  }

  private renderizarDatatable() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

}
