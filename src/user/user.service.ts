import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const { userName, userId, userPassword } = createUserDto;
    const partialUser: Prisma.UserCreateInput = {
      userName,
      userId,
      userPassword,
    };

    const createResult: User | undefined = await this.prisma.user.create({
      data: { ...partialUser },
    });
    return createResult;
  }

  async findAllUser(): Promise<User[]> {
    const findAllResult: Partial<User[]> = await this.prisma.user.findMany();
    return findAllResult;
  }

  async findOneUser(userId: string) {
    const findOneUserResult: Partial<User> = await this.prisma.user.findFirst({
      where: { userId: userId },
    });
    return findOneUserResult;
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    const updateResult = await this.prisma.user.update({
      where: { id: updateUserDto.id },
      data: [{ userName: updateUserDto.userName }],
    });

    if (updateResult !== null) {
      return true;
    }
    return false;
  }

  async removeUser(id: number) {
    try {
      await this.prisma.user.delete({ where: { id: id } });
      return true;
    } catch (error) {
      Logger.error(`[User Delete Failed] Err Msg : ${error}`);
      return false;
    }
  }
}
