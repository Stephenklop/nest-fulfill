import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RegisterUserDto } from './dtos/register-user.dto';
import { RegisterUserCommand } from './commands/register-user.command';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dtos/user-response.dto';
import { GetUserQuery } from './queries/get-user.query';

@Controller('user')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('register')
  async registerUser(@Body() dto: RegisterUserDto) {
    const user = await this.commandBus.execute(
      new RegisterUserCommand(
        dto.email,
        dto.password,
        dto.firstName,
        dto.lastName,
      ),
    );

    // Convert the returned user entity to a "response" DTO to hide password
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    // Dispatch the query
    const user = await this.queryBus.execute(new GetUserQuery(id));
    if (!user) return null;

    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
