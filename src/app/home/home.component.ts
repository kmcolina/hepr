import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { KaranApiService } from '../core/services/karan-api.service'
import {AlertsService} from "../core/services/alerts.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerForm: FormGroup;
  dataRegister: FormGroup;

  constructor(
    private fB: FormBuilder,
    private karanApiService: KaranApiService,
    private alerts: AlertsService,
  ) {
    this.registerForm = fB.group({
      user: ['',Validators.minLength(6)],
      password: ['', Validators.minLength(8)],
      name: ['', Validators.minLength(2)],
      lastName: ['', Validators.minLength(2)],
      email: [''],
      dni: ['', Validators.minLength(2)],
      juridica: [false],
    });
    this.dataRegister = this.fB.group({
        email: [''],
        username: [''],
        dni: [''],
        first_name: [''],
        last_name: [''],
        password: [''],
        password_confirmation: ['']
      }
    )
  }



  ngOnInit(): void {
  }

  registrarError(error: [type: string, msg: any]) {
    let tipo;
    let msg;
    if (error[0] === 'username') {
      tipo = 'Usuario ';
    } else if (error[0] === 'email') {
      tipo = 'Correo ';
    } else if (error[0] === 'dni') {
      tipo = 'Cédula ';
    } else if (error[0] === 'first_name') {
      tipo = 'Nombre ';
    } else if (error[0] === 'last_name') {
      tipo = 'Apellido ';
    } else {
      tipo = 'Contraseña ';
    }

    const msgAux = error[1].toString();
    if (msgAux === "This field must be unique.") {
      msg = "ya existe, intente otro diferente";
    } else if (msgAux === "Enter a valid email address") {
      msg = "ya esta registrado";
    } else if (msgAux.indexOf("characters") !== -1) {
      msg = "es muy corto"
    } else {
      msg = "es invalido"
    }

    return tipo + msg;
  }


  registrarUsuario () {
    this.dataRegister = this.fB.group({
        email: [this.registerForm.value.email],
        username: [this.registerForm.value.user],
        dni: [this.registerForm.value.dni],
        first_name: [this.registerForm.value.name],
        last_name: [this.registerForm.value.lastName],
        password: [this.registerForm.value.password],
        password_confirmation: [this.registerForm.value.password]
      }
    )
    if(this.registerForm.value.juridica){
      const aux = this.karanApiService.registerJuridico(this.dataRegister.value);
      aux.subscribe((data:any)=>{
        if (data !== null) {
          this.alerts.showAlerts('Registro Con Exito!', 'success', 'Ahora puede acceder a su cuenta.');
        }
      },
        (error)=>{
          let errors: any = [];
          Object.entries(error.error).map((item)=>{
            if(item[0]==="password_confirmation"){
              return;
            }
            errors.push(this.registrarError(item))
          })
          this.alerts.showAlerts('Ups!', 'error', `${errors.join(", ").toString()}`);
        }
      )
    }else{
      const aux = this.karanApiService.registerNatural(this.dataRegister.value);
      aux.subscribe((data:any)=>{
        if (data !== null) {
          this.alerts.showAlerts('Registro Con Exito!', 'success', 'Ahora puede acceder a su cuenta.');
        }
      },
      (error)=>{
          let errors: any = [];
          Object.entries(error.error).map((item)=>{
            if(item[0]==="password_confirmation"){
              return;
            }
            errors.push(this.registrarError(item))
          })
          this.alerts.showAlerts('Ups!', 'error', `${errors.join(", ").toString()}`);
        }
      )
    }

  }
}
