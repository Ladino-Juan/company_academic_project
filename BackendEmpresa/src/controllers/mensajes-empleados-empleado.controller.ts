import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  MensajesEmpleados,
  Empleado,
} from '../models';
import {MensajesEmpleadosRepository} from '../repositories';

export class MensajesEmpleadosEmpleadoController {
  constructor(
    @repository(MensajesEmpleadosRepository) protected mensajesEmpleadosRepository: MensajesEmpleadosRepository,
  ) { }

  @get('/mensajes-empleados/{id}/empleados', {
    responses: {
      '200': {
        description: 'Array of MensajesEmpleados has many Empleado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.mensajesEmpleadosRepository.empleados(id).find(filter);
  }

  @post('/mensajes-empleados/{id}/empleados', {
    responses: {
      '200': {
        description: 'MensajesEmpleados model instance',
        content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof MensajesEmpleados.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleadoInMensajesEmpleados',
            exclude: ['id'],
            optional: ['mensajesEmpleadosId']
          }),
        },
      },
    }) empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {
    return this.mensajesEmpleadosRepository.empleados(id).create(empleado);
  }

  @patch('/mensajes-empleados/{id}/empleados', {
    responses: {
      '200': {
        description: 'MensajesEmpleados.Empleado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Partial<Empleado>,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.mensajesEmpleadosRepository.empleados(id).patch(empleado, where);
  }

  @del('/mensajes-empleados/{id}/empleados', {
    responses: {
      '200': {
        description: 'MensajesEmpleados.Empleado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Empleado)) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.mensajesEmpleadosRepository.empleados(id).delete(where);
  }
}
