import { Controller, Get, Post, Body, Param, Delete, Put, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() user: Pick<User, 'username' | 'password'>): Promise<{ access_token: string }> {
    return this.usersService.login(user);
  }

  @Post()
  create(@Body() user: Omit<User, 'id'>): Promise<User> {
    return this.usersService.create(user);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id).then(user => {
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: Partial<User>): Promise<void> {
    return this.usersService.update(+id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }

}
