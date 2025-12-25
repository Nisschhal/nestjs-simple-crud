import { CreateUserDto } from './create-user-dto';
import { PartialType } from '@nestjs/mapped-types';

/**
 * UpdateUserDto extends CreateUserDto by making all its properties optional.
 * This is useful for update operations where not all fields are required.
 * This uses the PartialType utility from @nestjs/mapped-types to achieve this.
 * which needs to be installed via npm or yarn.
 * Else you can simply use zod validation, however, zod validation required additional ZodValidationPipe implementation to be written which is in the docs.
 */

export class UpdateUserDto extends PartialType(CreateUserDto) {}
