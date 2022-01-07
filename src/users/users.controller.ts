import { Controller, Post, Body, Res, Get, Patch, Param } from '@nestjs/common';

@Controller('users')
export default class UsersController {
    @Get('test')
    test( ):string{
      return "estamos dentro dwel hola";
    }
}
