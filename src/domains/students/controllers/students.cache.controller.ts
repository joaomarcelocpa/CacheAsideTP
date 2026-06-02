import { Controller, Get, Param } from '@nestjs/common';
import { StudentsCacheService } from '../services/students.cache.service';

@Controller('students/cached')
export class StudentsCacheController {
  constructor(private readonly studentsCacheService: StudentsCacheService) {}

  @Get()
  async list() {
    return this.studentsCacheService.list();
  }

  @Get(':identifier')
  async view(@Param('identifier') identifier: string) {
    return this.studentsCacheService.view(identifier);
  }
}
