import Echo from 'laravel-echo';
import socketio from 'socket.io-client';

const echo = new Echo({
  broadcaster: 'socket.io',
  host: 'http://localhost:6001',
  client: socketio,
  transports: ['websocket'],
});

export default echo;
