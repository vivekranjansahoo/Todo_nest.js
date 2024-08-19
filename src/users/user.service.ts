import { Injectable, Inject } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

  async createUser(createUserDto: any): Promise<any> {
    const { username, password, role } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.db.collection('users').insertOne({
      username,
      password: hashedPassword,
      role,
    });
    return this.db.collection('users').findOne({ _id: result.insertedId });
  }

  async findUserByUsername(username: string): Promise<any> {
    return await this.db.collection('users').findOne({ username });
  }

  async findUserById(id: string): Promise<any> {
    return await this.db.collection('users').findOne({ _id: new ObjectId(id) });
  }

  async addRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.db
      .collection('users')
      .updateOne({ _id: new ObjectId(userId) }, { $set: { refreshToken } });
  }

  async findUserByRefreshToken(refreshToken: string): Promise<any> {
    return await this.db.collection('users').findOne({ refreshToken });
  }
}
