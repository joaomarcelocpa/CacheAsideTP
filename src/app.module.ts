import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configModuleOptions } from './config/config';
import { dbConfig } from './config/postgres/db.config';
import { StudentsModule } from './domains/students/students.module';
import { RedisModule } from './config/redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync(dbConfig),
    RedisModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
