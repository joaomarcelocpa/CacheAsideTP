import { Injectable } from '@nestjs/common';
import { StudentsReadRepository } from '../repositories/students.read.repository';
import { Student } from '../entities/student.entity';

export type SqlResponse<T> = { data: T; meta: { source: 'sql' } };

@Injectable()
export class StudentsReadService {
  constructor(private readonly readRepository: StudentsReadRepository) {}

  async list(): Promise<SqlResponse<Student[]>> {
    const students = await this.readRepository.findAll();
    return { data: students, meta: { source: 'sql' } };
  }
}
