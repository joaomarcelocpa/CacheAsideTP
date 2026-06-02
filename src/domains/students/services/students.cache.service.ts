import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentsCacheRepository } from '../repositories/students.cache.repository';
import { StudentsReadRepository } from '../repositories/students.read.repository';
import { Student } from '../entities/student.entity';

type CacheSource = 'cache_hit' | 'cache_miss' | 'sql';
export type CachedResponse<T> = { data: T; meta: { source: CacheSource } };

@Injectable()
export class StudentsCacheService {
  constructor(
    private readonly cacheRepository: StudentsCacheRepository,
    private readonly readRepository: StudentsReadRepository,
  ) {}

  async list(): Promise<CachedResponse<Student[]>> {
    const cached = await this.cacheRepository.getList();
    if (cached) return { data: cached, meta: { source: 'cache_hit' } };

    const students = await this.readRepository.findAll();
    await this.cacheRepository.setList(students);
    return { data: students, meta: { source: 'cache_miss' } };
  }
}
