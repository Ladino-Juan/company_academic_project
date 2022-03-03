import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CrearPersonaComponent } from './empleados/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './empleados/editar-persona/editar-persona.component';
import { EliminarPersonaComponent } from './empleados/eliminar-persona/eliminar-persona.component';
import { BuscarPersonaComponent } from './empleados/buscar-persona/buscar-persona.component';
import { CrearEmpresaComponent } from './empresas/crear-empresa/crear-empresa.component';
import { EditarEmpresaComponent } from './empresas/editar-empresa/editar-empresa.component';
import { EliminarEmpresaComponent } from './empresas/eliminar-empresa/eliminar-empresa.component';
import { BuscarEmpresaComponent } from './empresas/buscar-empresa/buscar-empresa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearPersonaComponent,
    EditarPersonaComponent,
    EliminarPersonaComponent,
    BuscarPersonaComponent,
    CrearEmpresaComponent,
    EditarEmpresaComponent,
    EliminarEmpresaComponent,
    BuscarEmpresaComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
