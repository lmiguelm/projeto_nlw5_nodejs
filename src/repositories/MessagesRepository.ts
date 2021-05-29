import { EntityRepository, Repository } from 'typeorm';
import { Message } from '../entities/Message';

@EntityRepository(Message)
export class MessagesRespository extends Repository<Message> {}
