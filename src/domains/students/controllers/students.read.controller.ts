import { Controller, Get } from '@nestjs/common';
import { StudentsReadService } from '../services/students.read.service';

@Controller('students')
export class StudentsReadController {
  constructor(private readonly studentsReadService: StudentsReadService) {}

  @Get()
  async list() {
    return this.studentsReadService.list();
  }
}
