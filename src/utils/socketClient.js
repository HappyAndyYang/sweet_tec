import { Socket } from 'net';
import { getLogger } from 'log4js';

const log = getLogger('socketClient');

async function socketClient(autoclose, address, port, message) {
  let inteval;
  const socket = new Socket();
  socket.readable = true;
  socket.writable = true;
  socket.on('data', (data) => {
    log.info(`received from server: ${data.toString}`);
  });
  socket.on('close', () => {
    log.info('socket close sucess! ');
  });
  socket.on('error', (error) => {
    log.error(`socket error: ${error}`);
  });
  socket.connect({ host: address, port }, () => {
    log.info(' server connected!');
    socket.write(message);
  });
  if (autoclose) {
    setTimeout(() => {
      socket.destroy();
      clearInterval(inteval);
    }, 1000);
  }
}

export default socketClient;
