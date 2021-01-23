import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Usuario} from '../../models/usuario';
import Swal from 'sweetalert2';
import {UsuarioService} from '../../services/usuario.service';
import {CuentaUsuarioService} from "../../services/cuenta-usuario.service";
import {CuentaUsuario} from "../../models/cuenta-usuario";

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  creaForm: FormGroup;
  private usuario: Usuario;

  constructor(private formBuilder: FormBuilder,
              private usuarioService: UsuarioService,
              private cuentaUsuarioService: CuentaUsuarioService) {
    this.creaForm = this.formBuilder.group({
      rut: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(9)]],
      nombreUsuario: ['', Validators.required],
      appPaterno: ['', Validators.required],
      appMaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
  }

  guardarUsuario(): void {
    if(!this.creaForm.get('rut').valid){
      Swal.fire({
        title: 'Error',
        text: 'Formato de rut incorrecto',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    } else if(!this.creaForm.get('password').valid){
      Swal.fire({
        title: 'Error',
        text: 'La contraseña debe tener mas de 8 caracteres',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    } else{
      if (this.creaForm.get('nombreUsuario').valid && this.creaForm.get('appPaterno').valid
        && this.creaForm.get('appMaterno').valid && this.creaForm.get('correo').valid) {
        let usuario: Usuario = new Usuario();
        usuario = this.crearUsuario();
        this.usuarioService.guardarUsuario(usuario).subscribe(data => {
          if (data.id !== -2) {
            this.crearCuentaUsuario(data.id);
            Swal.fire({
              title: 'Éxito',
              text: 'Usuario creado',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          } else {
            Swal.fire({
              title: 'Advertencia',
              text: 'Usuario ya existe',
              icon: 'info',
              confirmButtonText: 'Aceptar'
            });
          }
        }, error => {
          Swal.fire({
            title: 'Error',
            text: 'Reintente mas tarde',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Todos los campos deben ser llenados',
          icon: 'warning',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  }

  private crearUsuario(): Usuario {
    const usuario: Usuario = new Usuario();
      usuario.rut = this.creaForm.get('rut').value;
      usuario.nombre = this.creaForm.get('nombreUsuario').value;
      usuario.appPaterno = this.creaForm.get('appPaterno').value;
      usuario.appMaterno = this.creaForm.get('appMaterno').value;
      usuario.correo = this.creaForm.get('correo').value;
      usuario.password = this.creaForm.get('password').value;
    return usuario;
  }

  private crearCuentaUsuario(id: number): void{
    let cuentaUsuario: CuentaUsuario = new CuentaUsuario();
    let usuario: Usuario = new Usuario();
    usuario.id = id;
    cuentaUsuario.usuarioVO = usuario;
    this.cuentaUsuarioService.agregarCuenta(cuentaUsuario).subscribe(data =>{
      if(data){
        console.log("Exito");
      }
    }, error => {
      console.log("Error al crear cuenta usuario");
    })
  }

}
