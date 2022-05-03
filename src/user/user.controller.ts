import {
  Body,
  CACHE_MANAGER,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Cache } from 'cache-manager';
import { DietDto } from '../diet/dto/diet.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  public async getAllUsers(): Promise<UserDto[]> {
    const cachedResponse = await this.cacheManager.get('users');

    if (cachedResponse) {
      return cachedResponse as UserDto[];
    }
    const users = await this.userService.getAllUsers();

    await this.cacheManager.set('users', users, { ttl: 0 });

    return users;
  }

  @Get('/:id')
  public async getUserById(@Param('id') id: string): Promise<UserDto> {
    const cachedResponse = await this.cacheManager.get(`user_${id}`);

    if (cachedResponse) {
      return cachedResponse as UserDto;
    }

    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User not found with id ${id}`);
    }

    await this.cacheManager.set(`user_${id}`, user, { ttl: 0 });

    return user;
  }

  @Post()
  public async createUser(@Body() user: UserDto): Promise<UserDto> {
    return this.userService.createUser(user);
  }

  @Patch(':id')
  @HttpCode(204)
  public async updateUser(@Param('id') id: string, @Body() user: UserDto): Promise<void> {
    const userToUpdate = await this.userService.getUserById(id);

    if (!id || !userToUpdate) {
      throw new NotFoundException(`User not found with id ${id}`);
    }

    await this.userService.updateUser(id, user);
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

  @Get('/:id/saved-diets')
  public async getSavedDietsByUserId(@Param('id') userId: string): Promise<DietDto[]> {
    return this.userService.getSavedDietsByUserId(userId);
  }
}
