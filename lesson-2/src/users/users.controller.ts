import {
  ValidationPipe,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './user-dto/update-user-dto';
import { CreateUserDto } from './user-dto/create-user-dto';

export type UserRole = 'ADMIN' | 'USER';

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
};

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  /**
   *
   * GET
   * GETBYID
   *
   */
  @Get()
  getUsers(@Query() query?: User): User[] {
    return this.userService.findAll(query?.role);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findById(id);
  }

  @Post()
  createUser(@Body(ValidationPipe) user: CreateUserDto) {
    return this.userService.create({
      ...user,
      id: Math.floor(Math.random() * 1000), // Simple ID generation for demonstration
    });
  }

  /**
   * Using ValidationPipe to validate only the request body for updating a user.
   * unlike zodValidationPipe which was applied at the method level and tried to validate both id and body.
   * And we don't need to write zodValidationPipe code as we are using built-in ValidationPipe here.
   * This ensures that only the body is validated against the UpdateUserDto schema.
   */
  @Patch(':id')
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto, // <--- Add the pipe here!
  ) {
    return this.userService.update(id, user);
  }
}
