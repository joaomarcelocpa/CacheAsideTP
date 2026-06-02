import { Injectable, NotFoundException } from '@nestjs/common';
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

  async view(identifier: string): Promise<SqlResponse<Student>> {
    const student = await this.readRepository.findById(identifier);
    if (!student) throw new NotFoundException('Student not found');
    return { data: student, meta: { source: 'sql' } };
  }
}
