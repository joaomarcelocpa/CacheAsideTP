import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';

@Injectable()
export class StudentsReadRepository {
  constructor(
    @InjectRepository(Student)
    private readonly repo: Repository<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.repo.find();
  }

  async findById(identifier: string): Promise<Student | null> {
    return this.repo.findOneBy({ identifier });
  }

  async findByEmail(email: string): Promise<Student | null> {
    return this.repo.findOneBy({ email });
  }

  async findByRegistration(registration: string): Promise<Student | null> {
    return this.repo.findOneBy({ registration });
  }
}
