import { Injectable, NotFoundException } from '@nestjs/common';
import { StudentsReadRepository } from '../repositories/students.read.repository';
import { Student } from '../entities/student.entity';

@Injectable()
export class StudentsReadService {
  constructor(private readonly readRepository: StudentsReadRepository) {}

  async list(): Promise<Student[]> {
    return this.readRepository.findAll();
  }

  async view(identifier: string): Promise<Student> {
    const student = await this.readRepository.findById(identifier);
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }
}
