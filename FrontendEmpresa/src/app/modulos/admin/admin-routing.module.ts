import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscarPersonaComponent } from './empleados/buscar-persona/buscar-persona.component';
import { CrearPersonaComponent } from './empleados/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './empleados/editar-persona/editar-persona.component';

const routes: Routes = [
  {
    path: "crear-persona",
    component: CrearPersonaComponent
  },
  {
    path: "editar-persona",
    component: EditarPersonaComponent
  },
  {
    path: "listar-empleados",
    component: BuscarPersonaComponent
  },
  {
    path: "crear-empleado",
    component: CrearPersonaComponent
  },
  {
    path: "editar-empleado/:id",
    component: EditarPersonaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
