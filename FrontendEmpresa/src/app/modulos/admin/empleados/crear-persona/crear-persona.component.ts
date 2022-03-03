import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloDatos } from 'src/app/modelos/datos.modelo';
import { ModeloEmpleado } from 'src/app/modelos/empleado.modelo';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'nombre': ['', [Validators.required]],
    'apellido': ['', [Validators.required]],
    'telefono': ['', [Validators.required]],
    'email': ['', [Validators.required, Validators.email]],
  });
  constructor(private fb: FormBuilder,
    private servicioEmpleado: EmpleadoService,
    private router: Router) { }

  ngOnInit(): void {
  }

  GuardarEmpleado(){
    let nombre = this.fgValidador.controls['nombre'].value;
    let apellido = this.fgValidador.controls['apellido'].value;
    let telefono = this.fgValidador.controls['telefono'].value;
    let email = this.fgValidador.controls['email'].value;
    let e = new ModeloEmpleado();
    e.nombre = nombre;
    e.apellido = apellido;
    e.telefono = telefono;
    e.email = email;
    this.servicioEmpleado.CrearEmpleado(e).subscribe((datos: ModeloEmpleado) => {
      alert('Empleado almacenado correctamente')
      this.router.navigate(['/admin/listar-empleados']);
    }, (error: any) => {
      alert('Error almacenando el empleado'+error)
    })
  }



}
