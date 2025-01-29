// src/user/user.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { HashService } from './shared/utils/hash.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hash: HashService,
  ) {}

  async createUser(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    // Check for existing user
    const existing = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existing) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await this.hash.hashData(password);

    // Create user
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });
  }

  async findById(userId: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }
}
