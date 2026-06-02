import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { RedisModule } from '../../config/redis/redis.module';
import { StudentsWriteRepository } from './repositories/students.write.repository';
import { StudentsReadRepository } from './repositories/students.read.repository';
import { StudentsCacheRepository } from './repositories/students.cache.repository';
import { StudentsWriteService } from './services/students.write.service';
import { StudentsReadService } from './services/students.read.service';
import { StudentsCacheService } from './services/students.cache.service';
import { StudentsWriteController } from './controllers/students.write.controller';
import { StudentsReadController } from './controllers/students.read.controller';
import { StudentsCacheController } from './controllers/students.cache.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Student]), RedisModule],
  providers: [
    StudentsWriteRepository,
    StudentsReadRepository,
    StudentsCacheRepository,
    StudentsWriteService,
    StudentsReadService,
    StudentsCacheService,
  ],
  controllers: [
    StudentsWriteController,
    StudentsReadController,
    StudentsCacheController,
  ],
})
export class StudentsModule {}
