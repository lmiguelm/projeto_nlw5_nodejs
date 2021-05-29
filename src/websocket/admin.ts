import { Socket } from 'socket.io';
import { io } from '../app';

import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesService } from '../services/MessagesService';

io.on('connect', async (socket: Socket) => {
  const connectionsService = new ConnectionsService();
  const messagesService = new MessagesService();

  const allConnectionsWhitoutAdmin = await connectionsService.findAllWhithoutAdmin();

  io.emit('admin_list_all_users', allConnectionsWhitoutAdmin);

  socket.on('admin_list_messages_by_user', async (params, callback) => {
    const { userId } = params;

    const allMessages = await messagesService.listByUser(userId);

    callback(allMessages);
  });

  socket.on('admin_send_message', async ({ userId, text }) => {
    await messagesService.create({ text, userId, adminId: socket.id });

    const { socketId } = await connectionsService.findByUserId(userId);

    io.to(socketId).emit('admin_send_to_client', {
      text,
      socketId: socket.id,
    });
  });

  socket.on('admin_user_in_support', async ({ userId }) => {
    await connectionsService.updateAdminId(userId, socket.id);

    const allConnectionsWhitoutAdmin = await connectionsService.findAllWhithoutAdmin();

    io.emit('admin_list_all_users', allConnectionsWhitoutAdmin);
  });
});
