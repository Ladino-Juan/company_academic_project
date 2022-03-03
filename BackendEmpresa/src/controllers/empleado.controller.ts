import { authenticate } from '@loopback/authentication';
import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  model,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import { request } from 'http';
import {Credenciales, Empleado} from '../models';
import {EmpleadoRepository} from '../repositories';
import { AutentificacionService, NotificacionService } from '../services';


//@authenticate('admin')

export class EmpleadoController {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository : EmpleadoRepository,
    @service(NotificacionService)
    public servicioNotificacion: NotificacionService,
    @service(AutentificacionService)
    public servicioAutentificacion: AutentificacionService,
  ) {}


@authenticate.skip()
@post("/identificarEmpleado", {
  responses: {
    '200': {
      description: "identificacion de usuarios"
    }
  }
})
async identificarEmpleado(
  @requestBody() credenciales : Credenciales
){
  let p = await this.servicioAutentificacion.IdentificarEmpleado(credenciales.usuario , credenciales.clave);

  if(p){
    let token = this.servicioAutentificacion.GenerarTokenJWT(p);
    return {
      datos: {
        nombre: p.nombre,
        correo: p.email,
        id: p.id
      },
      tk: token
    }
  }else{
    throw new HttpErrors[401]('Datos invalidos')
  }
}

@authenticate.skip()
  @post('/empleados')
  @response(200, {
    description: 'Empleado model instance',
    content: {'application/json': {schema: getModelSchemaRef(Empleado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {
            title: 'NewEmpleado',
            exclude: ['id'],
          }),
        },
      },
    })
    empleado: Omit<Empleado, 'id'>,
  ): Promise<Empleado> {

    let clave = this.servicioAutentificacion.GenerarClave();
    let claveCifrada = this.servicioAutentificacion.CifrarClave(clave);
    empleado.clave = claveCifrada;
    let p = await this.empleadoRepository.create(empleado);

    //Notificar al usuario

    let nombre = empleado.nombre + ' ' + empleado.apellido;
    let telefono = empleado.telefono;
    let correo = empleado.email;
    let contraseña = clave;
    let mensaje = empleado.mensajesEmpleadosId;
    
    this.servicioNotificacion.EnviarNotificacionPorSms(telefono, nombre, correo, contraseña, mensaje);
    this.servicioNotificacion.EnviarNotificacionPorCorreo(nombre, correo, contraseña, mensaje);

    return p

  }

  @authenticate.skip()
  @get('/empleados/count')
  @response(200, {
    description: 'Empleado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Empleado) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empleadoRepository.count(where);
  }
  @authenticate.skip()
  @get('/empleados')
  @response(200, {
    description: 'Array of Empleado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Empleado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Empleado) filter?: Filter<Empleado>,
  ): Promise<Empleado[]> {
    return this.empleadoRepository.find(filter);
  }

  @patch('/empleados')
  @response(200, {
    description: 'Empleado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Empleado,
    @param.where(Empleado) where?: Where<Empleado>,
  ): Promise<Count> {
    return this.empleadoRepository.updateAll(empleado, where);
  }

  @get('/empleados/{id}')
  @response(200, {
    description: 'Empleado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Empleado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Empleado, {exclude: 'where'}) filter?: FilterExcludingWhere<Empleado>
  ): Promise<Empleado> {
    return this.empleadoRepository.findById(id, filter);
  }

  @patch('/empleados/{id}')
  @response(204, {
    description: 'Empleado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Empleado, {partial: true}),
        },
      },
    })
    empleado: Empleado,
  ): Promise<void> {
    await this.empleadoRepository.updateById(id, empleado);
  }
  @put('/empleados/{id}')
  @response(204, {
    description: 'Empleado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() empleado: Empleado,
  ): Promise<void> {
    await this.empleadoRepository.replaceById(id, empleado);
  }

  @del('/empleados/{id}')
  @response(204, {
    description: 'Empleado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.empleadoRepository.deleteById(id);
  }
}
