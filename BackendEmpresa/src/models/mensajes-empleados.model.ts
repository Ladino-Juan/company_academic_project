import {Entity, model, property, hasMany} from '@loopback/repository';
import {Empleado} from './empleado.model';

@model()
export class MensajesEmpleados extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;

  @hasMany(() => Empleado)
  empleados: Empleado[];

  constructor(data?: Partial<MensajesEmpleados>) {
    super(data);
  }
}

export interface MensajesEmpleadosRelations {
  // describe navigational properties here
}

export type MensajesEmpleadosWithRelations = MensajesEmpleados & MensajesEmpleadosRelations;
