import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(user: Omit<User, 'id'>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }

  async update(id: number, user: Partial<User>): Promise<void> {
    await this.usersRepository.update(id, user);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async login(user: Pick<User, 'username' | 'password'>): Promise<{ access_token: string }> {
    const user_ = await this.findByUsername(user.username);
    if (!user_) {
      throw new UnauthorizedException();
    }
    const isPasswordMatching = await bcrypt.compare(user.password, user_.password);
    if (!isPasswordMatching) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user_.id, username: user_.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
