import { Controller, Get } from '@nestjs/common';
import { StudentsCacheService } from '../services/students.cache.service';

@Controller('students/cached')
export class StudentsCacheController {
  constructor(private readonly studentsCacheService: StudentsCacheService) {}

  @Get()
  async list() {
    return this.studentsCacheService.list();
  }
}
