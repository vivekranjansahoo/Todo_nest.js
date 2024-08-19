import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';

import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  async getAllTodos(@Request() req: any): Promise<Todo[]> {
    if (req.user.role !== 'admin') {
      throw new ForbiddenException('Access denied');
    }
    console.log('inside the admin');
    return this.todoService.getAllTodos();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTodo(
    @Request() req: any,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return this.todoService.createTodo(req.user._id, createTodoDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getTodos(@Request() req: any): Promise<Todo[]> {
    return this.todoService.getTodos(req.user._id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getTodoById(
    @Request() req: any,
    @Param('id') id: string,
  ): Promise<Todo> {
    return this.todoService.getTodoById(req.user._id, id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateTodo(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.updateTodo(req.user._id, id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteTodo(
    @Request() req: any,
    @Param('id') id: string,
  ): Promise<void> {
    return this.todoService.deleteTodo(req.user._id, id);
  }
}
