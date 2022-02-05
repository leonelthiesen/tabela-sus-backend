import { Controller, Post, Body, Get } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    create(@Body() user: User) {
      return 'This action adds a new user';
    }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }
}
