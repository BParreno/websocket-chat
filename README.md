# Mini Proyecto Backend con NestJS - WebSocket Simple (Chat)

Este proyecto es una implementación de un backend con NestJS utilizando WebSockets para crear una funcionalidad de chat simple en tiempo real, como parte de una actividad.

## Opción Implementada: WebSocket Simple

Se ha implementado la **Opción 2** de la actividad, que consiste en un Gateway WebSocket que permite la comunicación bidireccional entre el servidor y los clientes para un chat básico.

### Funcionalidades:

* **Conexión/Desconexión de Clientes:** El servidor detecta cuando un cliente se conecta o se desconecta y lo registra en la consola.
* **Mensajes de Bienvenida y Notificaciones:** El servidor envía un mensaje de bienvenida al cliente recién conectado y notifica a los demás sobre nuevas conexiones o desconexiones.
* **Envío y Recepción de Mensajes de Chat:** Los clientes pueden enviar mensajes de texto y un nombre de remitente, y el servidor reenvía estos mensajes a todos los clientes conectados en tiempo real.
* **Consola del Servidor:** Muestra los mensajes recibidos de los clientes.

### Cómo Probarlo:

Sigue estos pasos para levantar el servidor y probar la funcionalidad del chat:

1.  **Clonar el Repositorio (si no lo has hecho):**

    ```bash
    git clone [URL_DE_TU_REPOSITORIO_GITHUB]
    cd websocket-chat
    ```

    (Asegúrate de reemplazar `[URL_DE_TU_REPOSITORIO_GITHUB]` con la URL real de este repositorio, por ejemplo: `https://github.com/TuUsuario/websocket-chat-nestjs.git`)

2.  **Instalar Dependencias:**

    ```bash
    npm install
    npm install @nestjs/platform-socket.io # Necesario para WebSockets
    ```

3.  **Iniciar la Aplicación NestJS:**

    ```bash
    npm run start:dev
    ```

    El servidor NestJS se iniciará y escuchará las conexiones HTTP y WebSocket en `http://localhost:3000` y `ws://localhost:3000` respectivamente.

4.  **Probar el Chat con un Cliente HTML:**

    * Asegúrate de que el archivo `chat-client.html` **está en la raíz del proyecto `websocket-chat`**.
    * Abre el archivo `chat-client.html` directamente en tu navegador web (Chrome, Firefox, Edge, etc.).
    * Abre múltiples pestañas o ventanas del mismo archivo para simular varios usuarios chateando.
    * Escribe mensajes y observa cómo se envían y reciben en tiempo real en todas las ventanas.

    ```html
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Chat WebSocket NestJS</title>
        <script src="[https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.5/socket.io.min.js](https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.5/socket.io.min.js)"></script>
        <style>
            body { font-family: Arial, sans-serif; margin: 20px; background-color: #f4f4f4; }
            .chat-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            #messages {
                border: 1px solid #ddd;
                height: 300px;
                overflow-y: scroll;
                padding: 10px;
                margin-bottom: 10px;
                background-color: #e9e9e9;
                border-radius: 4px;
            }
            #messageInput {
                width: calc(100% - 90px);
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 4px;
                margin-right: 8px;
            }
            #sendMessage {
                padding: 10px 15px;
                background-color: #007bff;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            #sendMessage:hover {
                background-color: #0056b3;
            }
            .message {
                margin-bottom: 8px;
                padding: 5px;
                border-radius: 4px;
                background-color: #f0f0f0;
            }
            .server-message {
                color: gray;
                font-style: italic;
            }
            input[type="text"]#senderName {
                width: 150px;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
                margin-bottom: 10px;
            }
        </style>
    </head>
    <body>
        <div class="chat-container">
            <h1>Chat Simple con NestJS WebSocket</h1>
            <label for="senderName">Tu Nombre:</label>
            <input type="text" id="senderName" value="Usuario" />
            <div id="messages"></div>
            <input type="text" id="messageInput" placeholder="Escribe un mensaje..." />
            <button id="sendMessage">Enviar</button>
        </div>

        <script>
            const socket = io('http://localhost:3000'); // Asegúrate de que esta URL sea correcta

            const messagesDiv = document.getElementById('messages');
            const messageInput = document.getElementById('messageInput');
            const sendMessageBtn = document.getElementById('sendMessage');
            const senderNameInput = document.getElementById('senderName');

            socket.on('message', (msg) => {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                if (msg.sender === 'Servidor') {
                    messageElement.classList.add('server-message');
                }
                messageElement.textContent = `${msg.sender}: ${msg.text}`;
                messagesDiv.appendChild(messageElement);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            });

            sendMessageBtn.addEventListener('click', () => {
                const text = messageInput.value;
                const sender = senderNameInput.value.trim();
                if (text.trim() !== '') {
                    socket.emit('chatMessage', { text, sender });
                    messageInput.value = '';
                }
            });

            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    sendMessageBtn.click();
                }
            });

            socket.on('connect', () => {
                console.log('Conectado al servidor WebSocket:', socket.id);
            });

            socket.on('disconnect', () => {
                console.log('Desconectado del servidor WebSocket.');
            });
        </script>
    </body>
    </html>
    ```
5.  **Probar el Chat con un Cliente HTML:**
Escribe tu nombre de usuario, escribe mensajes en el campo de texto y haz clic en "Enviar" o presiona "Enter". Deberías ver los mensajes aparecer en las ventanas conectadas.
* (Puedes abrir varias pestañas o ventanas del mismo archivo para simular varios usuarios chateando).
</immersive>