import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  public async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User not found with id ${id}`);
    }

    return user;
  }

  @Post()
  public async createUser(@Body() user: User): Promise<User> {
    return this.userService.createUser(user);
  }

  @Patch(':id')
  @HttpCode(204)
  public async updateUser(@Param('id') id: string, @Body() user: User): Promise<void> {
    const userToUpdate = await this.userService.getUserById(id);

    if (!id || !userToUpdate) {
      throw new NotFoundException(`User not found with id ${id}`);
    }

    await this.userService.updateUser(user);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteUser(@Param('id') id: string): Promise<void> {
    const userToDelete = await this.userService.getUserById(id);

    if (!id || !userToDelete) {
      throw new NotFoundException(`User not found with id ${id}`);
    }

    await this.userService.deleteUser(id);
  }
}
