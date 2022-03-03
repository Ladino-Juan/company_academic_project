import { Component, OnInit } from '@angular/core';
import { ModeloEmpleado } from 'src/app/modelos/empleado.modelo';
import { EmpleadoService } from 'src/app/servicios/empleado.service';

@Component({
  selector: 'app-buscar-persona',
  templateUrl: './buscar-persona.component.html',
  styleUrls: ['./buscar-persona.component.css']
})
export class BuscarPersonaComponent implements OnInit {

listadoRegistros: ModeloEmpleado[] = [];
  constructor(private empleadoServicio: EmpleadoService) { }

  ngOnInit(): void {
    this.ObtenerListadoEmpleados();
  }

  ObtenerListadoEmpleados(){
    this.empleadoServicio.ObtenerRegistros().subscribe((datos: ModeloEmpleado[]) => {
      this.listadoRegistros = datos;
    })
  }

}
