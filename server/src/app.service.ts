import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bye World!';
  }
  getProfile(): string {
    return "There's Your Profile!"
  }
}
