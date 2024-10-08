import { MongoClient, Db } from 'mongodb';

export const DATABASE_CONNECTION = 'DATABASE_CONNECTION';
export const DATABASE_NAME = 'intern';

export const MongodbConfig = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async (): Promise<Db> => {
      const client = new MongoClient('mongodb://localhost:27017');

      // const client = new MongoClient(
      //   'mongodb+srv://vivekranjansahoo81:nestjs@cluster0.myewz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
      // );
      await client.connect();
      return client.db(DATABASE_NAME);
    },
  },
];
