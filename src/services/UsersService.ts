import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';

export class UsersService {
  private repository: Repository<User>;

  constructor() {
    this.repository = getCustomRepository(UsersRepository);
  }

  async create(email: string) {
    const userAlreadyExists = await this.repository.findOne({ email });

    if (userAlreadyExists) {
      return userAlreadyExists;
    }

    const user = this.repository.create({ email });
    await this.repository.save(user);

    return user;
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({ email });
  }
}
