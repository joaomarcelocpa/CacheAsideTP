import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentsCacheRepository } from '../repositories/students.cache.repository';
import { StudentsReadRepository } from '../repositories/students.read.repository';
import { Student } from '../entities/student.entity';

@Injectable()
export class StudentsCacheService {
  constructor(
    private readonly cacheRepository: StudentsCacheRepository,
    private readonly readRepository: StudentsReadRepository,
  ) {}

  async list(): Promise<Student[]> {
    const cached = await this.cacheRepository.getList();
    if (cached) return cached;

    const students = await this.readRepository.findAll();
    await this.cacheRepository.setList(students);
    return students;
  }

  async view(identifier: string): Promise<Student> {
    const cached = await this.cacheRepository.get(identifier);
    if (cached) return cached;

    const student = await this.readRepository.findById(identifier);
    if (!student) throw new NotFoundException('Student not found');

    await this.cacheRepository.set(student);
    return student;
  }
}
