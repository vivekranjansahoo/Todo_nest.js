import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { ObjectId } from 'mongodb';

@Controller('blog')
export class BlogController {
  constructor(private readonly mongodbService: BlogService) {}

  @Post('create')
  async create(@Body() createDto: any) {
    return this.mongodbService.create('blogs', createDto);
  }

  @Get('read/:id')
  async read(@Param('id') id: string) {
    return this.mongodbService.read('blogs', {
      _id: new ObjectId(id),
    });
  }

  @Get('read-all')
  async readAll() {
    return this.mongodbService.read('blogs', {});
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateDto: any) {
    console.log('update is progress');
    return this.mongodbService.update('blogs', id, updateDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.mongodbService.delete('blogs', id);
  }
}
