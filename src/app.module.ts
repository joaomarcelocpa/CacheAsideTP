import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configModuleOptions } from './config/config';
import { dbConfig } from './config/postgres/db.config';
import { StudentsModule } from './domains/students/students.module';
import { RedisModule } from './config/redis/redis.module';
import { TimingInterceptor } from './common/interceptors/timing.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    TypeOrmModule.forRootAsync(dbConfig),
    RedisModule,
    StudentsModule,
  ],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: TimingInterceptor }],
})
export class AppModule {}
