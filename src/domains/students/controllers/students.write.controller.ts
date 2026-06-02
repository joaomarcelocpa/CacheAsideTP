import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { StudentsWriteService } from '../services/students.write.service';
import { StudentCreateDto } from '../dtos/student.create.dto';
import { StudentUpdateDto } from '../dtos/student.update.dto';

@Controller('students')
export class StudentsWriteController {
  constructor(private readonly studentsWriteService: StudentsWriteService) {}

  @Post()
  async create(@Body() dto: StudentCreateDto) {
    return this.studentsWriteService.create(dto);
  }

  @Put(':identifier')
  async update(
    @Param('identifier') identifier: string,
    @Body() dto: StudentUpdateDto,
  ) {
    return this.studentsWriteService.update(identifier, dto);
  }

  @Delete(':identifier')
  @HttpCode(204)
  async delete(@Param('identifier') identifier: string) {
    return this.studentsWriteService.delete(identifier);
  }
}
