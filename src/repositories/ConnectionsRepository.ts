import { EntityRepository, Repository } from 'typeorm';
import { Connection } from '../entities/Connection';

@EntityRepository(Connection)
export class ConnectionsRespository extends Repository<Connection> {}
