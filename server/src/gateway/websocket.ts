import { OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { clearInterval } from 'timers';

@WebSocketGateway({ cors: true })
export class WebSocketProvider implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  timerValue: number = 0;
  interval: NodeJS.Timeout;
  intervalSync: NodeJS.Timeout;

  onModuleInit() {
    this.server.on('connection', (client) => {
      console.log(`Client connected (ID: ${client.id}})`);
      client.emit('timer', this.timerValue);
    });
  }

  constructor() {
    this.startTimer();
  }

  startTimer() {
    const randomTime = Math.floor(Math.random() * 10000) + 5000;
    console.log(`Next timer will end in ${randomTime / 1000} seconds`);

    setTimeout(() => {
      clearInterval(this.interval);
      clearInterval(this.intervalSync);
      this.timerValue = 0;
      this.server.emit('timer', this.timerValue);
      this.startTimer();
    }, randomTime);

    this.interval = setInterval(() => {
      this.timerValue += 0.1;
    }, 100);

    this.intervalSync = setInterval(() => {
      this.server.emit('timer', this.timerValue)
    }, 1500);
  }
}
