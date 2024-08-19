import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.schema';
import { isValidObjectId } from './utils/validation';

@Injectable()
export class TodoService {
  private readonly todosCollection;

  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {
    this.todosCollection = this.db.collection<Todo>('todos');
  }

  async createTodo(
    userId: string,
    createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    const result = await this.todosCollection.insertOne({
      ...createTodoDto,
      userId,
    });
    // console.log(result);
    return this.todosCollection.find({ _id: result.insertedId }).toArray();
  }

  async getTodos(userId: string): Promise<Todo[]> {
    return this.todosCollection.find({ userId }).toArray();
  }

  async getTodoById(userId: string, todoId: string): Promise<Todo> {
    console.log(userId, todoId);
    if (!isValidObjectId(todoId)) {
      throw new BadRequestException('Invalid Todo ID');
    }
    const todo = await this.todosCollection.findOne({
      _id: new ObjectId(todoId),
      userId,
    });

    console.log(todo);
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  //update for todo

  async updateTodo(
    userId: string,
    todoId: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<Todo> {
    // console.log(userId, todoId, updateTodoDto);
    const result = await this.todosCollection.findOneAndUpdate(
      { _id: new ObjectId(todoId), userId },
      { $set: updateTodoDto },
      { returnDocument: 'after' },
    );
    // console.log(result);
    if (!result) {
      throw new NotFoundException('Todo not found');
    }

    return result;
  }

  async deleteTodo(userId: string, todoId: string): Promise<void> {
    const result = await this.todosCollection.deleteOne({
      _id: new ObjectId(todoId),
      userId,
    });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Todo not found');
    }
    return result;
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.todosCollection.find({}).toArray();
  }
}
