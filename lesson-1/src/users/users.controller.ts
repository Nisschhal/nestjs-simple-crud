import {
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
import { type CreateUserDto, userSchema } from './user-dto/create-user-dto';
import { ZodValidationPipe } from './user-dto/zod-validation-pipe';
import {
  type UpdateUserDto,
  updateUserSchema,
} from './user-dto/update-user-dto';

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
  @UsePipes(new ZodValidationPipe(userSchema))
  createUser(@Body() user: CreateUserDto) {
    return this.userService.create({
      ...user,
      id: Math.floor(Math.random() * 1000), // Simple ID generation for demonstration
    });
  }

  @Patch(':id')
  /**
   * @UsePipes(new ZodValidationPipe(updateUserSchema)) applies validation to all the incoming requests for this route, including both the id parameter and the request body.
   * As a result, the ZodValidationPipe will attempt to validate the id parameter against the updateUserSchema, which is not intended and will lead to validation errors.
   * To fix this, we should apply the ZodValidationPipe only to the request body by specifying it in the @Body() decorator.
   * Unless we want to validate the id parameter with a different schema, we should avoid using @UsePipes at the method level in this case.
   */
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateUserSchema)) user: UpdateUserDto,
  ) {
    return this.userService.update(id, user);
  }
}
