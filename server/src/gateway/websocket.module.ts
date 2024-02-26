import { Module } from '@nestjs/common';
import { WebSocketProvider } from './websocket';

@Module({
    providers: [WebSocketProvider]
})
export class WebSocketModule{};