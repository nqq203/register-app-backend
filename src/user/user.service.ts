import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const { username, email, password } = createUserDTO;
    const existingEmail = await this.userRepository.findOne({ where: { email } });
    const existingUsername = await this.userRepository.findOne({ where: { username } });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new HttpException('Invalid email format', HttpStatus.BAD_REQUEST);
    }

    if (existingEmail) {
      throw new HttpException('Email already exists', HttpStatus.OK);
    }
    if (existingUsername) {
      throw new HttpException('Username already exists', HttpStatus.OK);
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new HttpException(
        'Password must be at least 8 characters long, contain at least one uppercase letter, one special character, and one number',
        HttpStatus.BAD_REQUEST
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.create({
      username,
      email,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }
}
