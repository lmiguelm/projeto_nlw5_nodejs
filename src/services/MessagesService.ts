import { getCustomRepository, Repository } from 'typeorm';
import { Message } from '../entities/Message';
import { MessagesRespository } from '../repositories/MessagesRepository';

interface IMessageCreate {
  adminId?: string;
  text: string;
  userId: string;
}

export class MessagesService {
  private repository: Repository<Message>;

  constructor() {
    this.repository = getCustomRepository(MessagesRespository);
  }

  async create({ adminId, text, userId }: IMessageCreate) {
    const message = this.repository.create({ adminId, text, userId });
    await this.repository.save(message);
    return message;
  }

  async listByUser(userId: string) {
    const messages = await this.repository.find({
      where: { userId },
      relations: ['user'],
    });
    return messages;
  }
}
