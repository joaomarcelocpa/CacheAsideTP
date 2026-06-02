import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';

@Injectable()
export class StudentsWriteRepository {
  constructor(
    @InjectRepository(Student)
    private readonly repo: Repository<Student>,
  ) {}

  async create(data: Partial<Student>): Promise<Student> {
    return this.repo.save(this.repo.create(data));
  }

  async update(identifier: string, data: Partial<Student>): Promise<Student> {
    await this.repo.update({ identifier }, data);
    return this.repo.findOneByOrFail({ identifier });
  }

  async delete(identifier: string): Promise<void> {
    await this.repo.delete({ identifier });
  }
}
