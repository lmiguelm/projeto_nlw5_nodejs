import { Socket } from 'socket.io';
import { io } from '../app';

import { ConnectionsService } from '../services/ConnectionsService';
import { UsersService } from '../services/UsersService';
import { MessagesService } from '../services/MessagesService';

interface IParams {
  text: string;
  email: string;
}

io.on('connect', (socket: Socket) => {
  const connectionService = new ConnectionsService();
  const usersService = new UsersService();
  const messagesService = new MessagesService();

  socket.on('client_first_access', async ({ email, text }: IParams) => {
    let userId = null;

    const userAlreadyExists = await usersService.findByEmail(email);

    if (!userAlreadyExists) {
      const user = await usersService.create(email);
      await connectionService.create({ socketId: socket.id, userId: user.id });
      userId = user.id;
    } else {
      userId = userAlreadyExists.id;
      const connection = await connectionService.findByUserId(userAlreadyExists.id);

      if (!connection) {
        await connectionService.create({ socketId: socket.id, userId: userAlreadyExists.id });
      } else {
        connection.socketId = socket.id;
        await connectionService.create(connection);
      }
    }

    await messagesService.create({ text, userId });

    const allMessages = await messagesService.listByUser(userId);

    socket.emit('client_list_all_messages', allMessages);

    const allUsers = await connectionService.findAllWhithoutAdmin();
    io.emit('admin_list_all_users', allUsers);
  });

  socket.on('client_send_to_admin', async ({ text, socketAdminId }) => {
    const { userId } = await connectionService.findBySocketId(socket.id);

    const message = await messagesService.create({ text, userId });

    io.to(socketAdminId).emit('admin_receive_message', {
      message,
      socketId: socket.id,
    });
  });
});
