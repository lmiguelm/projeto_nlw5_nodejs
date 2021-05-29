import { getCustomRepository, Repository } from 'typeorm';
import { Connection } from '../entities/Connection';
import { ConnectionsRespository } from '../repositories/ConnectionsRepository';

interface IConnectionCreate {
  socketId: string;
  userId: string;
  adminId?: string;
  id?: string;
}

export class ConnectionsService {
  private repository: Repository<Connection>;

  constructor() {
    this.repository = getCustomRepository(ConnectionsRespository);
  }

  async create({ userId, socketId, adminId, id }: IConnectionCreate) {
    const connection = this.repository.create({ userId, socketId, adminId, id });
    await this.repository.save(connection);
    return connection;
  }

  async findByUserId(userId: string) {
    return await this.repository.findOne({ userId });
  }
}
