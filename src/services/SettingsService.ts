import { getCustomRepository, Repository } from 'typeorm';
import { Setting } from '../entities/Setting';
import { SettingsRespository } from '../repositories/SettingsRespository';

interface ISettingsCreate {
  chat: boolean;
  username: string;
}

export class SettingsService {
  private repository: Repository<Setting>;

  constructor() {
    this.repository = getCustomRepository(SettingsRespository);
  }

  async create({ chat, username }: ISettingsCreate) {
    const userAlreadyExists = this.repository.findOne({ username });

    if (userAlreadyExists) {
      throw new Error('Usuário já cadastrado!');
    }

    const settings = this.repository.create({ chat, username });
    await this.repository.save(settings);
    return settings;
  }

  async findByUsername(username: string) {
    const setting = await this.repository.findOne({ username });
    return setting;
  }

  async update(username: string, chat: boolean) {
    await this.repository
      .createQueryBuilder()
      .update(Setting)
      .set({ chat })
      .where('username = :username', {
        username,
      })
      .execute();
  }
}
