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

  async findAllWhithoutAdmin() {
    return await this.repository.find({ where: { adminId: null }, relations: ['user'] });
  }

  async findBySocketId(socketId: string) {
    return await this.repository.findOne({ socketId });
  }

  async updateAdminId(userId: string, adminId: string) {
    await this.repository
      .createQueryBuilder()
      .update(Connection)
      .set({ adminId })
      .where('user_id = :userId', {
        userId,
      })
      .execute();
  }
}
