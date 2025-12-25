import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './users.controller';
import { UpdateUserDto } from './user-dto/update-user-dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Alice',
      email: 'aFt7R@example.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: 'Bob',
      email: 'adBkT@example.com',
      role: 'USER',
    },
    {
      id: 3,
      name: 'Charlie',
      email: 'tKd0Y@example.com',
      role: 'USER',
    },
    {
      id: 4,
      name: 'David',
      email: 'O2Nw2@example.com',
      role: 'USER',
    },
    {
      id: 5,
      name: 'Eve',
      email: 'c2j4V@example.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'ADMIN' | 'USER'): User[] {
    return role ? this.users.filter((user) => user.role === role) : this.users;
  }

  findById(id: number): User | String {
    const user = this.users.find((user) => user.id === id);
    return user ? user : 'User not found';
  }

  create(user: User): User {
    this.users.push(user);
    return user;
  }

  update(id: number, updatedUser: UpdateUserDto): User {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
    return this.users[userIndex];
  }

  delete(id: number): User | String {
    const deletedUser = this.users.find((user) => user.id === id);
    if (!deletedUser) {
      return 'User not found';
    }
    this.users = this.users.filter((user) => user.id !== id);
    return deletedUser;
  }
}
