import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {MensajesEmpleados, MensajesEmpleadosRelations, Empleado} from '../models';
import {EmpleadoRepository} from './empleado.repository';

export class MensajesEmpleadosRepository extends DefaultCrudRepository<
  MensajesEmpleados,
  typeof MensajesEmpleados.prototype.id,
  MensajesEmpleadosRelations
> {

  public readonly empleados: HasManyRepositoryFactory<Empleado, typeof MensajesEmpleados.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmpleadoRepository') protected empleadoRepositoryGetter: Getter<EmpleadoRepository>,
  ) {
    super(MensajesEmpleados, dataSource);
    this.empleados = this.createHasManyRepositoryFactoryFor('empleados', empleadoRepositoryGetter,);
    this.registerInclusionResolver('empleados', this.empleados.inclusionResolver);
  }
}
