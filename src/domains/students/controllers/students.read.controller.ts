import { Controller, Get, Param } from '@nestjs/common';
import { StudentsReadService } from '../services/students.read.service';

@Controller('students')
export class StudentsReadController {
  constructor(private readonly studentsReadService: StudentsReadService) {}

  @Get()
  async list() {
    return this.studentsReadService.list();
  }

  @Get(':identifier')
  async view(@Param('identifier') identifier: string) {
    return this.studentsReadService.view(identifier);
  }
}
