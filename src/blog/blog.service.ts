import { Inject, Injectable } from '@nestjs/common';
import { MongoClient, Db, ObjectId } from 'mongodb';
import { DATABASE_CONNECTION } from 'src/config/mongodb.providers';

@Injectable()
export class BlogService {
  private client: MongoClient;

  //-----------------------------------------------------------
  private db: Db;

  constructor() {
    this.client = new MongoClient('mongodb://localhost:27017');
    this.connect();
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db('intern');
  }

  //--------------------------********----------------------------------
  // constructor(@Inject(DATABASE_CONNECTION) private readonly db: Db) {}

  async create(collection: string, document: any) {
    const result = await this.db.collection(collection).insertOne(document);
    return result;
  }

  async read(collection: string, query: any) {
    const result = await this.db.collection(collection).find(query).toArray();
    return result;
  }

  async update(collection: string, id: string, document: any) {
    const result = await this.db
      .collection(collection)
      .updateOne({ _id: new ObjectId(id) }, { $set: document });
    return result;
  }
  async delete(collection: string, id: string) {
    const result = await this.db
      .collection(collection)
      .deleteOne({ _id: new ObjectId(id) });
    return result;
  }
}
