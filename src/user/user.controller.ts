import { Controller, Post, Body, Response, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto/register.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async register(@Body() userData: CreateUserDTO, @Response() res) {
    try {
      const user = await this.userService.create(userData);
      return res.status(HttpStatus.CREATED).json({
        message: 'User registered successfully',
        data: user,
        statusCode: HttpStatus.CREATED,
      });
    } catch (error) {
      if (error instanceof HttpException) {
        return res.status(error.getStatus()).json({
          statusCode: error.getStatus(),
          message: error.getResponse(),
        });
      }
      console.log(error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Internal Server Error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
