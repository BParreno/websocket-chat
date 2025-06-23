// src/chat/chat.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'; // Importa Server y Socket de 'socket.io'
import { Logger } from '@nestjs/common'; // Para logging

@WebSocketGateway({
  cors: {
    origin: '*', // Permite conexiones desde cualquier origen (ajusta en producción)
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer() server: Server; // Instancia del servidor WebSocket

  private logger: Logger = new Logger('ChatGateway'); // Logger para mensajes

  // Este método se ejecuta cuando un cliente se conecta
  handleConnection(client: Socket) {
    this.logger.log(`Cliente conectado: ${client.id}`);
    // Envía un mensaje de bienvenida solo a este cliente
    client.emit('message', {
      sender: 'Servidor',
      text: `¡Bienvenido al chat! Tu ID es: ${client.id}`,
    });
    // Opcional: Notifica a todos los demás que un nuevo usuario se conectó
    client.broadcast.emit('message', {
      sender: 'Servidor',
      text: `Un nuevo usuario (${client.id}) se ha unido.`,
    });
  }

  // Este método se ejecuta cuando un cliente se desconecta
  handleDisconnect(client: Socket) {
    this.logger.log(`Cliente desconectado: ${client.id}`);
    // Notifica a todos los demás que un usuario se desconectó
    this.server.emit('message', {
      sender: 'Servidor',
      text: `Usuario (${client.id}) se ha desconectado.`,
    });
  }

  // Maneja el evento 'chatMessage' enviado por los clientes
  @SubscribeMessage('chatMessage')
  handleChatMessage(
    @MessageBody() data: { text: string; sender: string }, // Datos del mensaje: texto y remitente
    @ConnectedSocket() client: Socket, // Información del cliente que envió el mensaje
  ): void {
    this.logger.log(`Mensaje recibido de <span class="math-inline">\{client\.id\} \(</span>{data.sender}): ${data.text}`);

    // Reenvía el mensaje a todos los clientes conectados (incluido el remitente)
    this.server.emit('message', {
      sender: data.sender || 'Anónimo', // Usa el remitente enviado o "Anónimo"
      text: data.text,
      timestamp: new Date().toISOString(), // Añade un timestamp
    });
  }
}