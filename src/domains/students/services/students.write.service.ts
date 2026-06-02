import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import * as bcrypt from 'bcrypt';
import { StudentsWriteRepository } from '../repositories/students.write.repository';
import { StudentsReadRepository } from '../repositories/students.read.repository';
import { StudentsCacheRepository } from '../repositories/students.cache.repository';
import { StudentCreateDto } from '../dtos/student.create.dto';
import { StudentUpdateDto } from '../dtos/student.update.dto';
import { Student } from '../entities/student.entity';

@Injectable()
export class StudentsWriteService {
  constructor(
    private readonly writeRepository: StudentsWriteRepository,
    private readonly readRepository: StudentsReadRepository,
    private readonly cacheRepository: StudentsCacheRepository,
  ) {}

  private generateRegistration(): string {
    return String(Math.floor(100000 + Math.random() * 900000));
  }

  async create(dto: StudentCreateDto): Promise<Student> {
    const emailInUse = await this.readRepository.findByEmail(dto.email);
    if (emailInUse) throw new ConflictException('Email already in use');

    let registration: string;
    do {
      registration = this.generateRegistration();
    } while (await this.readRepository.findByRegistration(registration));

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const student = await this.writeRepository.create({
      ...dto,
      identifier: createId(),
      registration,
      password: passwordHash,
    });

    await Promise.all([
      this.cacheRepository.set(student),
      this.cacheRepository.invalidateList(),
    ]);

    return student;
  }

  async update(identifier: string, dto: StudentUpdateDto): Promise<Student> {
    const existing = await this.readRepository.findById(identifier);
    if (!existing) throw new NotFoundException('Student not found');

    if (dto.email) {
      const emailInUse = await this.readRepository.findByEmail(dto.email);
      if (emailInUse && emailInUse.identifier !== identifier)
        throw new ConflictException('Email already in use');
    }

    const data: Partial<Student> = { ...dto };
    if (dto.password) data.password = await bcrypt.hash(dto.password, 10);

    const updated = await this.writeRepository.update(identifier, data);

    await Promise.all([
      this.cacheRepository.set(updated),
      this.cacheRepository.invalidateList(),
    ]);

    return updated;
  }

  async delete(identifier: string): Promise<void> {
    const existing = await this.readRepository.findById(identifier);
    if (!existing) throw new NotFoundException('Student not found');

    await this.writeRepository.delete(identifier);

    await Promise.all([
      this.cacheRepository.del(identifier),
      this.cacheRepository.invalidateList(),
    ]);
  }
}
