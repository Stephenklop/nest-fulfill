import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class HashService {
  constructor(private readonly configService: ConfigService) {}
  private secretKey: string;

  onModuleInit() {
    const key = this.configService.get<string>('ENCRYPTION_SECRET');
    if (!key) throw new Error('Encryption secret key is not set');
    this.secretKey = key;
  }

  async hashData(data: string): Promise<string> {
    return await argon2.hash(data);
  }

  async verifyHash(hash: string, data: string): Promise<boolean> {
    return await argon2.verify(hash, data);
  }
}
