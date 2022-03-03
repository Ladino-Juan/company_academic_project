import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empresa} from './empresa.model';

@model()
export class Empleado extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: false,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: false,
  })
  edad: string;

  @property({
    type: 'date',
    required: false,
  })
  fechaNacimiento: string;

  @property({
    type: 'number',
    required: false,
  })
  sueldo: number;

  @property({
    type: 'boolean',
    required: false,
  })
  esDirectivo: boolean;

  @property({
    type: 'boolean',
    required: false,
  })
  esCliente: boolean;

  @belongsTo(() => Empresa)
  empresaId: string;

  @property({
    type: 'string',
  })
  mensajesEmpleadosId: string;

  
  @property({
    type: 'string',
    required: false
  })
 clave: string;

  constructor(data?: Partial<Empleado>) {
    super(data);
  }
}

export interface EmpleadoRelations {
  // describe navigational properties here
}

export type EmpleadoWithRelations = Empleado & EmpleadoRelations;
