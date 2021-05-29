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
}
