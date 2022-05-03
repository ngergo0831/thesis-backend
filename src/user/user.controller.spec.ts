import { CacheModule, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

jest.mock('./user.service.ts');

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [UserController],
      providers: [UserService]
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should call getAllUsers', async () => {
      const getAllUsersSpy = jest.spyOn(service, 'getAllUsers').mockResolvedValue([] as User[]);

      await controller.getAllUsers();

      expect(getAllUsersSpy).toHaveBeenCalledTimes(1);
    });

    it('should return an array of Users', async () => {
      const mockedUsers = [new User()];

      jest.spyOn(service, 'getAllUsers').mockResolvedValue(mockedUsers);

      const result = await controller.getAllUsers();

      expect(result).toBe(mockedUsers);
    });
  });

  describe('getUserById', () => {
    it('should call getUserById', async () => {
      const getUserByIdSpy = jest.spyOn(service, 'getUserById').mockResolvedValue(new User());

      await controller.getUserById('1');

      expect(getUserByIdSpy).toHaveBeenCalledTimes(1);
    });

    it('should return a User if exists', async () => {
      const mockedUser = new User({ id: '1' });

      jest.spyOn(service, 'getUserById').mockResolvedValue(mockedUser);

      const result = await controller.getUserById('1');

      expect(result).toBe(mockedUser);
    });

    it('should throw NotFoundException when no User found with given id', async () => {
      jest.spyOn(service, 'getUserById').mockResolvedValue(undefined);

      const resultPromise = controller.getUserById('1');

      await expect(resultPromise).rejects.toThrowError(NotFoundException);
    });
  });
});
