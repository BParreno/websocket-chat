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

    * Abre el archivo **(en la raíz del proyecto)** directamente en tu navegador.
    * Escribe tu nombre de usuario, escribe mensajes en el campo de texto y haz clic en "Enviar" o presiona "Enter". Deberías ver los mensajes aparecer en las ventanas conectadas..
    * (Puedes abrir varias pestañas o ventanas del mismo archivo para simular varios usuarios chateando).
</immersive>