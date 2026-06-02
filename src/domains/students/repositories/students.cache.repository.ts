import { Inject, Injectable } from '@nestjs/common';
import { Redis } from '@upstash/redis';
import { Student } from '../entities/student.entity';
import { REDIS_CLIENT } from '../../../config/redis/redis.module';

const STUDENT_TTL = 3600;
const studentKey = (identifier: string) => `student:${identifier}`;
const LIST_KEY = 'students:list';

@Injectable()
export class StudentsCacheRepository {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async set(student: Student): Promise<void> {
    await this.redis.set(studentKey(student.identifier), student, {
      ex: STUDENT_TTL,
    });
  }

  async del(identifier: string): Promise<void> {
    await this.redis.del(studentKey(identifier));
  }

  async getList(): Promise<Student[] | null> {
    return this.redis.get<Student[]>(LIST_KEY);
  }

  async setList(students: Student[]): Promise<void> {
    await this.redis.set(LIST_KEY, students, { ex: STUDENT_TTL });
  }

  async invalidateList(): Promise<void> {
    await this.redis.del(LIST_KEY);
  }
}
