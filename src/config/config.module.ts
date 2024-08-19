import { Module } from '@nestjs/common';
import { MongodbConfig } from './mongodb.providers';
@Module({
  providers: [...MongodbConfig],
  exports: [...MongodbConfig],
})
export class ConfigModule {}
