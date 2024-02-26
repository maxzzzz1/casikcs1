/// <reference types="node" />
import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
export declare class WebSocketProvider implements OnModuleInit {
    server: Server;
    timerValue: number;
    interval: NodeJS.Timeout;
    intervalSync: NodeJS.Timeout;
    onModuleInit(): void;
    constructor();
    startTimer(): void;
}
